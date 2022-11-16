const User = require("../mongooseModels/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {loginValidate, registerValidate}  = require("../controllersRouters/validateForm")
const { default: mongoose } = require("mongoose")

module.exports = {
    register: (req, res)=>{

        // Primeira verificação 
        const {error} = registerValidate(req.body)
        if(error) return res.status(400).send(tratarError(error))
   
        // Segunda verificação (verificar se já exite o email no db)
        User.findOne({email: req.body.email}).then(user=>{ 
            user ? res.status(400).send(tratarError("Este email já existe!")) : saveUser()
        })
        
        // Criação do nosso user(documento) se baseando no Schema já criado
        const saveUser = ()=>{
            const user = new User({
                nome: req.body.nome,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password)
            })
            user.save().then(user=>{
                res.send(user)
            }).catch(err=>{
                res.send("Erro ao salvar usuário :(")
            })
        }
        
    },
    login: async (req, res)=>{
        const {error} = loginValidate(req.body)
        if(error) return res.status(400).send(tratarError(error))

        const selectedUser = await User.findOne({email: req.body.email})

        if(!selectedUser) return res.status(400).send(tratarError("Email ou senha incorretos!"))

        const passAndUserMatch = bcrypt.compareSync(req.body.password, selectedUser.password)
        if(!passAndUserMatch) return res.status(400).send(tratarError("Email ou senha incorretos!"))

        const tokenJWT = jwt.sign({id: selectedUser._id, admin: selectedUser.admin}, process.env.TOKEN_SECRET)
        res.cookie("authorizationToken", tokenJWT, {
            secure: true,
            httpOnly: true
        })
        res.send(true)
    },
    logout: (req, res)=>{
        if(req.body.logout){
            res.clearCookie("authorizationToken")
            res.status(200).end()
        }else res.status(401).send("Logout failed!")
    },
    alterarIMGPerfil: async(req, res)=>{
        let url = req.body.urlImgPerfil

        verifyTokenHandlerUser(req, res, (userVerified)=>{
            User.updateOne({_id: userVerified.id}, {imagePerfil: url}).then(stats=>{
                res.status(200).end()
            }).catch(err=>{
                console.log(err)
                res.status(500).end()
            })
        })
    },
    alterarNomePerfil: async(req, res)=>{
        let valueNome = req.body.nome
        verifyTokenHandlerUser(req, res, (userVerified)=>{
            User.updateOne({_id: userVerified.id}, {nome: valueNome}).then(stats=>{
                res.status(200).end()
                console.log(stats)
            }).catch(err=>{
                console.log(err)
                res.status(500).end()
            })
        })
    },
    createFicha: async (req, res)=>{
        let fichaInfosObj = req.body
        verifyTokenHandlerUser(req, res, (userVerified)=>{
            User.updateOne({_id: userVerified.id}, {$push: {fichas:fichaInfosObj}}).then(stats=>{
                res.status(200).end()
            }).catch(err=>{
                console.log(err)
                res.status(500).end()
            })
        })

    }
}

function verifyTokenHandlerUser(req, res, cb){
    const token = req.cookies.authorizationToken
    if(!token) return res.status(401).render("tela acesso negado", {tela: "ao Console"})
    try{
        const userVerified = jwt.verify(token, process.env.TOKEN_SECRET)
        cb(userVerified)
    }
    catch(err){res.send({user: false, message: "Usuário não logado!"})}
}
function tratarError(error){
    if(typeof error === "string") return {message: error}
    if(typeof error === "object"){
        let typeError = error.details[0].path[0]
        if(typeError === "nome")return {message: "Seu nome deve conter pelo menos 3 caracteres!"}
        if(typeError === "email")return {message: "Formato de email não valido!"}
        if(typeError === "password")return {message: "Sua senha deve conter pelo menos 6 caracteres!"}
        else return {message: "Ocorreu um erro não listado na função!"}
    }
}
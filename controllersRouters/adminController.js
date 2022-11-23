const User = require("../mongooseModels/User")
const verifyTokenHandlerUser = require("./function_verifyToken")

module.exports = {
    accessInfosUserAdmin: async(req, res)=>{
        verifyTokenHandlerUser(req, res, async (userVerified)=>{
            if(userVerified.admin){
                let users = await User.find({})
                let userAtual = users.filter(user => {
                    return user._id.toString() === userVerified.id
                })
                users.splice(users.indexOf(userAtual[0]), 1)
                let usersMapeados = users.map(user=> {
                    return {nome: user.nome, email: user.email, imagePerfil: user.imagePerfil, fichas: user.fichas, data: user.createAd }
                })
                res.status(200).send(usersMapeados)
            }else{
                res.status(401).send({message: "Acesso a api negado!"})
            }
        })
    },
    submitMessageUser: async(req, res)=>{
        verifyTokenHandlerUser(req, res, async (userVerified)=>{
            let admin = await User.findOne({_id: userVerified.id})
            let userSelected = await User.findOne({email: req.body.email_player})
            let message = {
                admin: admin.nome,
                message: req.body.message,
                data: new Date().toLocaleDateString()

            }
            if(userSelected.messageHeader.length > 3) return res.send({limite: true})
            User.updateOne({email: req.body.email_player}, {$push: {messageHeader: message}})
            .then(stats=> {
                console.log(userSelected.messageHeader)
                res.status(200).send({limite: false})
            })
            .catch(err=>{
                console.log(err)
                res.status(500).end()
            })
        })
    },
    deleteMessageUser: async(req, res)=>{
        verifyTokenHandlerUser(req, res, async (userVerified)=>{
            let user = await User.findOne({_id: userVerified.id})
            user.messageHeader.splice(req.body.idMessage, 1)
            User.updateOne({_id: userVerified.id}, {messageHeader: user.messageHeader})
            .then(stats=> res.status(200).end())
            .catch(err=>{
                console.log(err)
                res.status(500).end()
            })
    
        })
    }
}
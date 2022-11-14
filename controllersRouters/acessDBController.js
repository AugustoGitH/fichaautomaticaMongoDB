const jwt = require("jsonwebtoken")
const User = require("../mongooseModels/User")

module.exports = {
    accessInfosUser: async(req, res)=>{
        verifyTokenHandlerUser(req, res, async (userVerified)=>{
            const {nome, email, imagePerfil, admin} = await User.findOne({_id: userVerified.id})
            res.json({nome, email, imagePerfil, admin}).end()
        })
    },
    accessInfosFichas: async(req, res)=>{
        verifyTokenHandlerUser(req, res, async (userVerified)=>{
            let user = await User.findOne({_id: userVerified.id})
            res.send(user.fichas)

        })
    },
    accessFichaSelected: async(req, res)=>{
        let fichaId = req.params.id
        verifyTokenHandlerUser(req, res, async (userVerified)=>{
        let user = await User.findOne({_id: userVerified.id})
        let fichaSelect = user.fichas.filter(ficha=>{
            return ficha.infosFicha.id_ficha === fichaId
        })
        res.send(fichaSelect[0])
    })
    },
    alterarFichaDB: async(req, res)=>{
        let fichaModified = req.body
        let idFicha = fichaModified.infosFicha.id_ficha
        verifyTokenHandlerUser(req, res, async(userVerified)=>{
            let user = await User.findOne({_id: userVerified.id})
            let fichaSelect = user.fichas.filter(ficha=> {
                return ficha.infosFicha.id_ficha === idFicha
            })

            let positionFicha = user.fichas.indexOf(fichaSelect[0])
            user.fichas.splice(positionFicha, 1, fichaModified)

            User.updateOne({_id: userVerified.id}, {fichas: user.fichas}).then(stats=>{
                res.status(200).end()
            }).catch(err=>{
                console.log(err)
                res.status(500).end()
            })
        })
    },
    deleteFichaDB: (req, res)=>{
        let idFicha = req.body.idFicha

        verifyTokenHandlerUser(req, res, async(userVerified)=>{
            let user = await User.findOne({_id: userVerified.id})
            let fichaSelect = user.fichas.filter(ficha=> {
                return ficha.infosFicha.id_ficha === idFicha
            })

            let positionFicha = user.fichas.indexOf(fichaSelect[0])
            user.fichas.splice(positionFicha, 1)

            User.updateOne({_id: userVerified.id}, {fichas: user.fichas}).then(stats=>{
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
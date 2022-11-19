const User = require("../mongooseModels/User")
const verifyTokenHandlerUser = require("./function_verifyToken")
module.exports = {
    accessInfosUser: async(req, res)=>{
        verifyTokenHandlerUser(req, res, async (userVerified)=>{
            const {nome, email, imagePerfil, messageHeader} = await User.findOne({_id: userVerified.id})
            res.status(200).send({nome, email, imagePerfil, messageHeader})
        })
    },
    accessInfosFichas: async(req, res)=>{
        verifyTokenHandlerUser(req, res, async (userVerified)=>{
            let user = await User.findOne({_id: userVerified.id})
            res.status(200).send(user.fichas)
        })
    },
    accessFichaSelected: async(req, res)=>{
        let fichaId = req.params.id
        verifyTokenHandlerUser(req, res, async (userVerified)=>{
        let users = await User.find({})
        let fichasAll = users.map(user => user.fichas).flat()

        let fichaSelect = fichasAll.filter(ficha=>{
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
    },
    verifyQuantityFichas: (req, res, next)=>{
        verifyTokenHandlerUser(req, res, async(userVerified)=>{
            let user = await User.findOne({_id: userVerified.id})

            if(userVerified.admin) return next()
            else{
                if(user.fichas.length >= 3) return res.render("telaAlert", {message: `Sua conta não pode te mais de ${3} fichas...`})
                next()
            }
        })
    },

}

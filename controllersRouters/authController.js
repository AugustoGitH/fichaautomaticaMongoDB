const jwt = require("jsonwebtoken")

module.exports = {
    authUser(req, res, next){
        const token = req.cookies.authorizationToken
        if(!token) return res.status(401).render("tela acesso negado", {tela: "ao Console"})
        try{
            const userVerified = jwt.verify(token, process.env.TOKEN_SECRET)
            next()
        }
        catch(err){ res.send({user: false, message: "Usuário não logado!"}) }
    },
    authAdmin(req, res, next){
        const token = req.cookies.authorizationToken
        if(!token) return res.status(401).render("tela acesso negado", {tela: "ao Console"})
        try{
            const userVerified = jwt.verify(token, process.env.TOKEN_SECRET)
            if(userVerified.admin) return next()
            else return res.status(401).render("telaNotAccess", {tela: "ao Console"})
        }
        catch(err){ res.send({user: false, message: "Usuário não logado!"}) }
    },
    redirectConsoleAdmin(req, res, next){
        const token = req.cookies.authorizationToken
        if(!token) return res.status(401).render("tela acesso negado", {tela: "ao Console"})
        try{
            const userVerified = jwt.verify(token, process.env.TOKEN_SECRET)
            if(userVerified.admin) return res.redirect("/admin-game/console")
            else return next()
        }
        catch(err){ 
            console.log(err)
            res.send({user: false, message: "Usuário não logado!"}) 
        }
    }

}
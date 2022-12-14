const verifyTokenHandlerUser = require("./function_verifyToken")

module.exports = {
    authUser(req, res, next){
        verifyTokenHandlerUser(req, res, userVerified=>{
            next()
        })
    },
    authAdmin(req, res, next){
        verifyTokenHandlerUser(req, res, userVerified=>{
            if(userVerified.admin) return next()
            else return res.status(401).render("telaNotAccess", {tela: "ao Console"})
        })
    },
    redirectConsoleAdmin(req, res, next){
        verifyTokenHandlerUser(req, res, userVerified=>{
            if(userVerified.admin) return res.redirect("/admin-game/console")
            else return next()
        })
    },
    redirectConsole(req, res, next){
        const token = req.cookies.authorizationToken
        if(!token) return next()
        verifyTokenHandlerUser(req, res, userVerified=>{
            if(userVerified.admin) return res.redirect("/admin-game/console")
            if(userVerified) return res.redirect("/console")
            else return next()
        })
    }
}
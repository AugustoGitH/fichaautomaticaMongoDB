const jwt = require("jsonwebtoken")
module.exports = async (req, res, next)=>{
    const token = req.cookies.authorizationToken
    if(!token) return res.status(401).render("tela acesso negado", {tela: "ao Console"})
    try{
        const userVerified = jwt.verify(token, process.env.TOKEN_SECRET)
        next()
    }catch(err){
        res.send({user: false, message: "Usuário não logado!"})
    }
}   
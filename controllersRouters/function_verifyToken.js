
const jwt = require("jsonwebtoken")
const User = require("../mongooseModels/User")
module.exports = async (req, res, cb)=>{
    const token = req.cookies.authorizationToken
    if(!token) return res.status(401).render("telaNotAccess", {message: "Você não está logado!"})
    try{
        const userVerified = jwt.verify(token, process.env.TOKEN_SECRET)
        let user = await User.findOne({_id: userVerified.id})

        if(!user) {
            res.clearCookie("authorizationToken")
            return res.status(401).render("telaNotAccess", {message: "Ocorreu um erro no sistema!"})
        }
        cb(userVerified)
    }
    catch(err){res.send({user: false, message: "Usuário não logado!"})}
}
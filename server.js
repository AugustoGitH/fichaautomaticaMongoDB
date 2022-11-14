const { env } = require("process")
require("dotenv").config()
const express = require("express")
const app = express()
const path = require("path")
const mongoose = require("mongoose")
const userRouter = require("./routers/userRouters")
const accessDBRouters = require("./routers/accessDBRouters")
const cookieParser = require('cookie-parser')
const auth = require("./controllersRouters/authController")
const bodyParser = require("body-parser")
const PORT = process.env.PORT || 3000
// Mongoose 
mongoose.connect(process.env.MONGO_CONNECTION_URL, 
(err)=> err ? console.log(err) : console.log("------------> BANCO DE DADOS CARREGADO <------------"))


// Fazer uso arquivos estáticos
app.use("/public", express.static("public"))
app.use(cookieParser())

// Routers Separadas
app.use(bodyParser.json({limit: '99999mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '99999mb', extended: true}))

app.use("/user", userRouter)
app.use("/DB", accessDBRouters)



// Views EJS
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")


const viewsRender = {
    renderInicial: (req, res)=> {
        const token = req.cookies.authorizationToken
        if(token) return res.render("tela inicial", {logado: true})
        if(!token) return res.render("tela inicial", {logado: false})
    },
    renderRegister: (req, res)=> res.render("tela de registro", {error: false}),
    renderLogin: (req, res)=> res.render("tela de login"),
    renderConsole: (req, res)=> res.render("tela de usuario"),
    renderTelaCriarFicha: (req, res)=> res.render("tela criar ficha"),
    renderTelaFichaSelected: (req, res)=> res.render("tela ficha")
}
app.get("/", viewsRender.renderInicial)
app.get("/registrar", viewsRender.renderRegister)
app.get("/login", viewsRender.renderLogin)
app.get("/console", auth, viewsRender.renderConsole)
app.get("/criarSuaFicha", auth, viewsRender.renderTelaCriarFicha)
app.get("/suaFicha", auth, viewsRender.renderTelaFichaSelected)



// Ligando o servidor
app.listen(PORT, ()=>{
    console.log("------------> SERVIDOR LIGADO NA PORTA " + PORT + " <------------")
})
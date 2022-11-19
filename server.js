const { env } = require("process")
require("dotenv").config()
const express = require("express")
const app = express()
const path = require("path")
const mongoose = require("mongoose")

const userRouter = require("./routers/userRouters")
const accessDBRouters = require("./routers/accessDBRouters")
const accessDBController = require("./controllersRouters/acessDBController")
const adminRouter = require("./routers/adminRouters")


const cookieParser = require('cookie-parser')
const auth = require("./controllersRouters/authController")
const bodyParser = require("body-parser")
const PORT = process.env.PORT || 3000



app.use("/public", express.static("public"))
app.use(cookieParser())


app.use(bodyParser.json({limit: '99999mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '99999mb', extended: true}))

app.use("/user", userRouter)
app.use("/DB", accessDBRouters)
app.use("/admin-game", adminRouter)


// app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")


const viewsRender = {
    renderInicial: (req, res)=> {
        const token = req.cookies.authorizationToken
        if(token) return res.render("telaInicial", {logado: true})
        else return res.render("telaInicial", {logado: false})
    },
    renderRegister: (req, res)=> res.render("telaRegister", {error: false}),
    renderLogin: (req, res)=> res.render("telaLogin"),
    renderConsole: (req, res)=> res.render("consoleUser"),
    renderTelaCriarFicha: (req, res)=> res.render("telaCreateFicha"),
    renderTelaFichaSelected: (req, res)=> res.render("telaFicha")
}
app.get("/", viewsRender.renderInicial)
app.get("/registrar", viewsRender.renderRegister)
app.get("/login", viewsRender.renderLogin)
app.get("/console", auth.authUser, auth.redirectConsoleAdmin, viewsRender.renderConsole)
app.get("/criarSuaFicha", auth.authUser, accessDBController.verifyQuantityFichas, viewsRender.renderTelaCriarFicha)
app.get("/suaFicha", auth.authUser, viewsRender.renderTelaFichaSelected)



mongoose.connect(process.env.MONGO_CONNECTION_URL, (err)=> err ? console.log(err) : console.log("------------> BANCO DE DADOS CARREGADO"))

app.listen(PORT, ()=>{
    console.log("------------> SERVIDOR LIGADO NA PORTA" + PORT)
})
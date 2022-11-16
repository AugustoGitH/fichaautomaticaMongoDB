const express = require("express")
const router = express.Router()
const adminController = require("../controllersRouters/adminController")
const auth = require("../controllersRouters/authController")

router.get("/console", auth.authAdmin, (req, res)=> res.render("consoleAdmin"))
router.get("/ficha-view", auth.authAdmin, (req, res)=> res.render("telaFichaView"))






module.exports = router
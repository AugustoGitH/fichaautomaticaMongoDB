const express = require("express")
const router = express.Router()
const userController = require("../controllersRouters/userController")

router.post("/register", userController.register)
router.post("/login", userController.login)
router.post("/logout", userController.logout)
router.post("/alterar-imgPerfil", userController.alterarIMGPerfil)
router.post("/alterar-nomePerfil", userController.alterarNomePerfil)
router.post("/create-ficha", userController.createFicha)

module.exports = router
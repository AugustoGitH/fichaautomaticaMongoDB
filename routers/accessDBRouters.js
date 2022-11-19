const express = require("express")
const router = express.Router()

const accessDBControllers = require("../controllersRouters/acessDBController")
router.get("/jogador", accessDBControllers.accessInfosUser)
router.get("/fichas", accessDBControllers.accessInfosFichas)
router.get("/ficha/:id", accessDBControllers.accessFichaSelected)
router.post("/alterar-ficha", accessDBControllers.alterarFichaDB)
router.delete("/deletar-ficha", accessDBControllers.deleteFichaDB)


module.exports = router

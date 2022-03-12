let express = require('express')
let router = express.Router()

let CadPropController = require("../controllers/CadPropController")

router.get('/listaservicos', CadPropController.viewForm)
router.post('/listaservicos', CadPropController.redirectForm)
router.post('/criar', CadPropController.salvarForm)

router.get('/cliente/listapropostas', CadPropController.viewPropostas)
router.post('/cliente/listapropostas', CadPropController.aceitarProposta)

module.exports = router
let express = require('express')
let router = express.Router()

let CadPropController = require("../controllers/CadPropController")

router.get('/listaservicos', CadPropController.viewForm)
router.post('/listaservicos', CadPropController.redirectForm)
router.post('/criar', CadPropController.salvarForm)

router.get('/cliente/listapropostas', CadPropController.viewPropostasCliente)
router.post('/cliente/listapropostas', CadPropController.aceitarPropostaCliente)

router.get('/freelancer/listapropostas', CadPropController.viewPropostasFreelancer)

module.exports = router
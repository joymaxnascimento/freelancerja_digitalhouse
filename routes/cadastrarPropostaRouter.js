let express = require('express')
let router = express.Router()

let CadPropController = require("../controllers/CadPropController")

const validacoesCadProposta = require('../middlewares/validacoesCadProposta')

router.get('/listaservicos', CadPropController.viewForm)
router.post('/listaservicos', CadPropController.redirectForm)
router.post('/criar', validacoesCadProposta, CadPropController.salvarForm)

router.get('/cliente/listapropostas', CadPropController.viewPropostasCliente)
router.post('/cliente/listapropostas', CadPropController.aceitarPropostaCliente)
router.post('/cliente/mensagemfreelancer', CadPropController.envioMensagemFreelancer)

router.get('/freelancer/listapropostas', CadPropController.viewPropostasFreelancer)

module.exports = router
let express = require('express')
let router = express.Router()

let servicoController = require("../controllers/ServicoController")

const validacoesCadServico = require('../middlewares/validacoesCadServico')

router.get('/', servicoController.viewForm)
router.post('/criar', validacoesCadServico, servicoController.salvarForm)
router.get('/cliente/lista', servicoController.viewServicosCliente)
router.get('/propostas/:idservico', servicoController.viewPropostasServico)
router.put('/propostas/aceitar', servicoController.aceitarPropostaCliente)

module.exports = router
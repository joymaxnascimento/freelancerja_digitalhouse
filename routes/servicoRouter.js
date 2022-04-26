let express = require('express')
let router = express.Router()

let servicoController = require("../controllers/ServicoController")

const validacoesCadServico = require('../middlewares/validacoesCadServico')

router.get('/', servicoController.viewForm)
router.get('/:idservico', servicoController.viewEditarServico)
router.put('/editar', servicoController.salvarEdicaoServico)
router.post('/criar', validacoesCadServico, servicoController.salvarForm)
router.get('/cliente/lista', servicoController.viewServicosCliente)
router.get('/propostas/:idservico', servicoController.viewPropostasServico)
router.put('/propostas/aceitar', servicoController.aceitarPropostaCliente)
router.put('/propostas/recusartrabalho', servicoController.recusarTrabalho)
router.put('/propostas/liberarpagamento', servicoController.liberarPagamentoProposta)
router.post('/propostas/mensagem', servicoController.mensagemPropostaCliente)

module.exports = router
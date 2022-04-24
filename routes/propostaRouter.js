let express = require('express')
let router = express.Router()

let propostaController = require("../controllers/PropostaController")

const validacoesCadProposta = require('../middlewares/validacoesCadProposta')

router.get('/listaservicos', propostaController.viewForm)
router.post('/listaservicos', propostaController.redirectForm)
router.post('/criar', validacoesCadProposta, propostaController.salvarForm)

router.post('/cliente/mensagemfreelancer', propostaController.envioMensagemFreelancer)

router.get('/freelancer/listapropostas', propostaController.viewPropostasFreelancer)
router.delete('/freelancer/listapropostas', propostaController.excluirPropostaFreelancer)
router.post('/freelancer/escrevermensagemcliente', propostaController.formMensagemCliente)
router.post('/freelancer/mensagemcliente', propostaController.envioMensagemCliente)

module.exports = router
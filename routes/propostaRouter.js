let express = require('express')
let router = express.Router()

let propostaController = require("../controllers/PropostaController")

const validacoesCadProposta = require('../middlewares/validacoesCadProposta')

router.get('/listaservicos', propostaController.viewForm)
router.post('/listaservicos', propostaController.redirectForm)
router.post('/criar', validacoesCadProposta, propostaController.salvarForm)

router.get('/freelancer/listapropostas', propostaController.viewPropostasFreelancer)
router.post('/freelancer/mensagem', propostaController.mensagemPropostaFreelancer)
router.delete('/freelancer/listapropostas', propostaController.excluirPropostaFreelancer)

module.exports = router
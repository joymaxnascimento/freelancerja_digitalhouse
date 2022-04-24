let express = require('express')
let router = express.Router()

let CadServicoController = require("../controllers/CadServicoController")

const validacoesCadServico = require('../middlewares/validacoesCadServico')

router.get('/', CadServicoController.viewForm)
router.post('/criar', validacoesCadServico, CadServicoController.salvarForm)

module.exports = router
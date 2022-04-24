let express = require('express')
let router = express.Router()

let servicoController = require("../controllers/servicoController")

const validacoesCadServico = require('../middlewares/validacoesCadServico')

router.get('/', servicoController.viewForm)
router.post('/criar', validacoesCadServico, servicoController.salvarForm)

module.exports = router
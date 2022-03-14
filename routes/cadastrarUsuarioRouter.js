let express = require('express')
let router = express.Router()

let CadUsuarioController = require("../controllers/UsuarioController")

const validacoesCadUsuario = require('../middlewares/validacoesCadUsuario')

router.get('/', CadUsuarioController.viewForm)
router.post('/criar', validacoesCadUsuario, CadUsuarioController.salvarForm)

module.exports = router
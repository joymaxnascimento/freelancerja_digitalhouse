let express = require('express')
let router = express.Router()
let CadUsuarioController = require("../controllers/UsuarioController")

router.get('/', CadUsuarioController.logoutUsuario)

module.exports = router
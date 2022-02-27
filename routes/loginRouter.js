let express = require('express');
let router = express.Router();
let UsuarioController = require('../controllers/UsuarioController')

router.post('/submit', UsuarioController.logarUsuario)
router.get('/', UsuarioController.loginForm)

module.exports = router;
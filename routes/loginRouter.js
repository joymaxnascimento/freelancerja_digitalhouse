var express = require('express');
var router = express.Router();
var UsuarioController = require('../controllers/UsuarioController')

router.post('/submit', UsuarioController.logarUsuario)
router.get('/', UsuarioController.loginForm)

module.exports = router;
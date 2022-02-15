var express = require('express');
var router = express.Router();
var UsuarioController = require('../controllers/UsuarioController')

router.post('/submit', UsuarioController.logarUsuario)
router.get('/', UsuarioController.loginForm)

router.get("/faleconosco", function(req, res) {
    res.render("fale_conosco")
  });

module.exports = router;
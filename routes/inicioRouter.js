let express = require('express')
let router  = express.Router()

router.get('/', function(req, res, next) {
  res.render('inicio', { title: 'Freelancer JÁ', loginCadastroUsuario: req.session.usuario.nome, linkLogin: '/' });
});

module.exports = router;
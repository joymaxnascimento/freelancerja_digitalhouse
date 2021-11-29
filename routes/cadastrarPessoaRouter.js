var express = require('express');
var router = express.Router();
// const CadPessController = require("../controllers/CadPessController");

/* GET home page. */
// router.get('/', FreelancerController.index );
/* GET users listing. */
router.get('/', function(req, res, next) {
  /* res.send('listar propostas'); */ 
  res.render('cadastrarPessoa', { title: 'Cadastro Preliminar da Pessoa' });
});

module.exports = router;








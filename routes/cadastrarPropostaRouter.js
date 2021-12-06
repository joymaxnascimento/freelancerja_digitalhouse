var express = require('express');
var router = express.Router();
const CadPropController = require("../controllers/CadPropController");


/* GET home page. */
// router.get('/', FreelancerController.index );
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   /* res.send('listar propostas'); */ 
//   res.render('proposta', { title: 'Cadastrar Proposta' });
// });

router.get('/', CadPropController.index );

module.exports = router;








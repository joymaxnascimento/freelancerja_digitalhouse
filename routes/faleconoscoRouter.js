var express = require('express');
var router  = express.Router();

let FaleConoscoController = require("../controllers/FaleConoscoController")
/* GET home page. */
//router.get('/', function(req, res, next) {
//  res.render('fale_conosco', { title: 'Fale Conosco' });
//});

router.get('/', FaleConoscoController.viewForm)

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('listar propostas');
  res.render('raiz', { title: 'FreelancerJA' });
});

module.exports = router;

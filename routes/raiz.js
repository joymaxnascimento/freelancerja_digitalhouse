var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  /* res.send('listar propostas'); */ 
  let id = 1;
  res.render('raiz', { title: 'FreelancerJA' });
});

module.exports = router;

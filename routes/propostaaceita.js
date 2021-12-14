var express = require('express');
var router  = express.Router();

/* GET home page. */
router.get('/propostaaceita', function(req, res, next) {
  res.render('propostaaceita', { title: 'propostaaceita' });
});


module.exports = router;

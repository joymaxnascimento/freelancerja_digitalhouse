var express = require('express');
var router = express.Router();
const PropParaVoceController = require("../controllers/PropParaVoceController");

/* GET home page. */
router.get('/', PropParaVoceController.index );


module.exports = router;

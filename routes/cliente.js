var express = require('express');
var router = express.Router();
const ClienteController = require("../controllers/ClienteController");

/* GET home page. */
router.get('/', ClienteController.index );


module.exports = router;

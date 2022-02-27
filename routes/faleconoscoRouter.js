let express = require('express');
let router  = express.Router();

let FaleConoscoController = require("../controllers/FaleConoscoController")

router.get('/', FaleConoscoController.viewForm)

module.exports = router;

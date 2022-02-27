let express = require('express')
let router  = express.Router()

let InicioController = require('../controllers/InicioController')

router.get('/', InicioController.inicio)

module.exports = router;
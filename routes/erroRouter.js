let express = require('express')
let router = express.Router()

let ErrorController = require('../controllers/ErrorController')

router.get('/', ErrorController.view)

module.exports = router
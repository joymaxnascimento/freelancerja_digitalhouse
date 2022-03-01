let express = require('express')
let router = express.Router()

let AdminController = require("../controllers/AdminController")

router.get('/', AdminController.admin)
router.get('/cadtiposervico', AdminController.tiposervicoView)
router.post('/cadtiposervico', AdminController.tiposervicoSalvar)

module.exports = router
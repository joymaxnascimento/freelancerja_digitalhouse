let express = require('express')
let router = express.Router()

let CadServicoController = require("../controllers/CadServicoController")

router.get('/', CadServicoController.viewForm)
router.post('/criar', CadServicoController.salvarForm)


module.exports = router
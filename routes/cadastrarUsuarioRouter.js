let express = require('express')
let router = express.Router()

let CadUsuarioController = require("../controllers/UsuarioController")

router.get('/', CadUsuarioController.viewForm)
router.post('/criar', CadUsuarioController.salvarForm)


module.exports = router
let express = require('express')
let router = express.Router()

let AdminController = require(
    "../controllers/AdminController")

 router.get('/', 
            AdminController.admin)

 router.get('/listartiposervico', 
    AdminController.listartiposervicoView)
 
 router.get('/cadtiposervico', 
    AdminController.tiposervicoView)
 
 router.get('/listarservico', 
    AdminController.listarservicoView)
 

router.post('/cadtiposervico', 
    AdminController.tiposervicoSalvar)

module.exports = router
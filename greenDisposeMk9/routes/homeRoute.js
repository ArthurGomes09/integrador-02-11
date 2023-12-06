const express = require('express')
const router = express.Router()

//importar o controlador de pensamentos tought
const HomeController = require('../controllers/HomeController')

router.get('/', HomeController.showHome)
router.get('/contacts',HomeController.showCont)

//Exportar a rota
module.exports = router

'use strict'

//Importamos express
var express = require('express')
    //Importamos el controlador
var autoController = require('../controllers/auto')

//Instanciamos un objeto Roter
var api = express.Router();

//Definimos el recurso GET con url : /api/auto/:id? , recibe
//un parametro y se procesa en el método prueba del controlador
//autoController
//api.get('/auto/:id?',autoController.prueba)
api.get('/auto/:id?', autoController.getAuto);
api.get('/autos/', autoController.getAutos);
api.post('/auto', autoController.saveAuto);
api.put('/auto/:id?', autoController.updateAuto);
api.delete('/auto/:id?', autoController.deleteAuto);

//Para utilizarlo en otros ficheros e importar
module.exports = api;
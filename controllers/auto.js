'use strict'

var Auto = require('../models/Auto')
var mongoose = require('mongoose')

//Definimos el método a ser consumido 
//desde el archivo de rutas
function prueba(req, res) {
    if (req.params.id) {
        var id = req.params.id
    } else {
        var id = "SIN ID"
    }
    res.status(200).send({
        message: "Este es el id " + id
    })
}

function getAuto(req, res) {
    //Obtenemos el id que llega como parametro
    var autoId = req.params.id;
    //Verificamos si el parametro enviado es un ObjectId
    var idValido = mongoose.Types.ObjectId.isValid(autoId);
    if(!idValido){
        //Si no es valido mostramos un mensaje de Id invalido
         res.status(409).send({message:'Id Invalido.'});
    }else{
        //Buscaremos un documento por el Id Proporcionado
        Auto.findById(autoId,function(err,auto){
            if(err){
                console.log(err)
                res.status(500).send({message:'Error al obtener el auto.',error:err});
            }else{
                if(!auto){
                    res.status(404).send({message:'No existe el auto con el id proporcionado.'});
                }else{
                    res.status(200).send({auto})
                }
            }
        });
    }
}

function getAutos(req, res) {
    //Auto.find({},function(arr,autos){
    //Para ordenar de manera descendente agregar -anio
    Auto.find({}).sort('anio').exec(function(err,autos){
          if(err){
            console.log(err)
            res.status(500).send({message:'Error al obtener los autos.',error:err});
          }else{   
            res.status(200).send({data:autos})
          }
    });
}

function saveAuto(req, res) {
    //Definimos el objeto que se guardara como documento
    var auto = new Auto(req.body);

    auto.save(function(err,data){
        if(err){
            console.log(err)
            res.status(500).send({message:'Error al guardar el Auto.',error:err});
        }else{
            res.status(200).send({data:data})
        }
    });
};

function updateAuto(req, res) {
    //Obtenemos el id que llega como parametro
    var autoId = req.params.id;
    //Verificamos si el parametro enviado es un ObjectId
    var idValido = mongoose.Types.ObjectId.isValid(autoId);
    if(!idValido){
        //Si no es valido mostramos un mensaje de Id invalido
         res.status(409).send({message:'Id Invalido.'});
    }else{
        //Utilizamos la función findByIdAndUpdate, busca un documento por id y lo actualiza
        Auto.findByIdAndUpdate(autoId,req.body,function(err,autoUpdate){
             if(err){
                console.log(err)
                res.status(500).send({message:'Error al actualizar el Auto.',error:err});
             }else{
                 //Si no existe el documento con el id proporcionado mostramos un espantoso 404
                 if(!autoUpdate){
                      res.status(404).send({message:'No existe el auto con el id proporcionado.'});
                 }else{
                    //Si se actualiza correctamente buscamos nuevamente en base, ya que el callback nos retorna
                    //un objeto pero este no es el actualizado si no el viejo
                    Auto.findById(autoId,function(err,autoNuevo){
                        //Buscamos por el ID y retornamos el registro viejo y el nuevo
                        res.status(200).send({viejo:autoUpdate,nuevo:autoNuevo})
                    });
                }
             }
        });
    }
}

function deleteAuto(req, res) {
     //Obtenemos el id que llega como parametro
    var autoId = req.params.id;
    //Verificamos si el parametro enviado es un ObjectId
    var idValido = mongoose.Types.ObjectId.isValid(autoId);
    if(!idValido){
        //Si no es valido mostramos un mensaje de Id invalido
         res.status(409).send({message:'Id Invalido.'});
    }else{
        //Buscaremos un documento por el Id Proporcionado
        Auto.findById(autoId,function(err,auto){
            if(err){
                console.log(err)
                res.status(500).send({message:'Error al obtener el auto.',error:err});
            }else{
                if(!auto){
                    res.status(404).send({message:'No existe el auto con el id proporcionado.'});
                }else{
                    //Eliminamos el auto encontrado
                    auto.remove(function(err){
                        if(err){
                            res.status(500).send({message:'Error al eliminar el auto.',error:err});
                        }else{
                            res.status(200).send({message:'El auto se ha eliminado correctamente'});
                        }
                    });
                }
            }
        });
    }
}

//Definimos los métodos que pueden ser alcanzables
module.exports = {
    prueba,
    getAuto,
    getAutos,
    saveAuto,
    updateAuto,
    deleteAuto
}
'use strict';

var database = require('../database'),
mongoose = require('mongoose'),
Schema = mongoose.Schema;

//Representa el tipo de documentos en la base de datos
var AutoSchema = new Schema(
    {
        marca: {
            type: String,
            trim: true,
            default: '',
            required: 'Inserta una marca por favor',
            index: {
                unique: false,
                dropDups: true
            }
        },
        modelo:{
            type: String,
            required: 'Inserta un modelo por favor',
            default: '',
            index:{
                unique: false,
                dropDups:true
            }
        },
        anio:{
            type: Number,
            require:  'Inserta un año por favor',
            default: '',
            index:{
                unique: false,
                dropDups:true
            }
        },
        version: {
            type: String,
            trim: true,
            default: '',
            required: 'Inserta una version por favor',
            index: {
                unique: false,
                dropDups: true
            }
        }
    },
    {
        timestamps: true
    }
);

//Definiremos que nuestro esquema se podra llamar Auto
//en las operaciones de nuestro controlador
var Auto = mongoose.model('Auto', AutoSchema);
//podra ser accedido desde cualquier parte si se importa
module.exports = Auto;

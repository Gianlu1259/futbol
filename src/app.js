//aca voy a configurar todo lo que tenga que ver con express
'use strict'
var express=require('express');//cargo la libreria de express

const { get } = require('mongoose');

var app=express()

//cargar rutas
var user_routes=require('./routes/users')//aca guardo la url a la que me quiero dirigir

//app.use(express.urlencoded({extended: false}))
app.use(express.json())


//cors
// configurar cabeceras http


//rutas
app.use('/api',user_routes)

module.exports=app;
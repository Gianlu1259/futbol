//aca voy a configurar todo lo que tenga que ver con express
'use strict'
var express=require('express');//cargo la libreria de express
const bp = require('body-parser')
const { get } = require('mongoose');

var app=express()

//cargar rutas
var user_routes=require('./routes/users')
var cancha_routes=require('./routes/cancha')
const auth_routes=require('./routes/auth')
const cancha_public =require('./routes/canchaPublic');
const negocio_routes = require('./routes/negocio');
const {verifyAuth} = require('./middleware/auth')
//app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//cors
// configurar cabeceras http

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});



app.use('/api',cancha_public);
app.use('/api',auth_routes);
app.use(verifyAuth);
app.use('/api',negocio_routes);
app.use('/api',user_routes);
app.use('/api',cancha_routes);

module.exports=app;
const userRoutes=require('./routes/users') 
const express=require('express');
const app=require('./app');//guardo toda la configuracion de express que hice en app.js
require('dotenv').config();
const port=process.env.PORT || 5000;


const moongose=require('mongoose');


moongose.connect(process.env.MONGODB_URI/*direccion del cluster de mongo atlas, esta en .env*/)
        .then(()=>{
            console.log("conexion a la base de datos exitosa");
            app.listen(port, ()=>{
                console.log("servidor corriendo en el puerto ",port);
            })
        })
        .catch(err=>console.log(err));
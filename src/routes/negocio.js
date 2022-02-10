const express = require("express");
const api=express.Router();
const controllerNegocio = require('../controllers/negocio')

api.post('/createNegocio', controllerNegocio.createNegocio);
api.post('/agregarCancha',(req,res)=>{
    return res.status(200).json({
        message:"This api hasn´t been created "
    })
});



module.exports=api;
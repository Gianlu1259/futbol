const express = require("express");
var CanchaControllers=require('../controllers/cancha')
var api=express.Router();


api.post('/newEvento',CanchaControllers.newEvento);
// api.get('/cancha',CanchaControllers.get_cancha);
api.delete('/delete_cancha',CanchaControllers.delete_cancha);





module.exports=api;
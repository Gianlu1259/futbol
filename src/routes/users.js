const express = require("express");
var UserController=require('../controllers/user')
var api=express.Router();



api.get('/get_user',UserController.get_user);
api.get('/get_user_registered',UserController.get_user_registered);
api.post('/rPartido/:idUsuario/cancha/:idCancha',UserController.save_user);
api.put('/update_user/:id',UserController.update_user);
api.delete('/delete_users',UserController.delete_users);
api.delete('/delete_user',UserController.delete_user);

module.exports=api;
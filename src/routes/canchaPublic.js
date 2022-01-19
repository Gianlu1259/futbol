const express = require("express");

const UserController = require('../controllers/user')
var api=express.Router();

api.post('/partido/:idUsuario/cancha/:idCancha',UserController.save_user);
api.get('/partido/:idUsuario/cancha/:idCancha',UserController.get_userNotRegistered);

module.exports=api;

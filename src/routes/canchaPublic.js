const express = require("express");

const UserController = require('../controllers/user')
const CanchaControllers = require('../controllers/cancha')
var api=express.Router();

api.post('/partido/:idUsuario/cancha/:idCancha',UserController.save_user);
api.get('/partido/:idUsuario/cancha/:idCancha',UserController.get_userNotRegistered);
api.get('/teams', UserController.getTeam);
api.get('/cancha',CanchaControllers.get_cancha);


module.exports=api;

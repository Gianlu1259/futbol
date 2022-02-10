const express = require("express");

const AuthController = require('../controllers/Auth')
var api=express.Router();



api.post('/verifyToken', AuthController.verifyToken);
api.post('/registerUser', AuthController.register);
api.post('/loginUser', AuthController.login);
api.post('/loguinWhitGoogle', AuthController.googleLogin);



module.exports=api;

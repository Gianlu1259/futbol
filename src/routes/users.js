const express = require("express");
var UserController=require('../controllers/user')


var api=express.Router();

api.post('/register',UserController.save_user);
api.get('/get_user',UserController.get_user)

module.exports=api;
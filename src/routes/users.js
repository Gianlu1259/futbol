const express = require("express");
var UserController=require('../controllers/user')


var api=express.Router();

api.post('/register',UserController.save_user);
api.get('/get_user',UserController.get_user);
api.put('/update_user/:id',UserController.update_user);

module.exports=api;
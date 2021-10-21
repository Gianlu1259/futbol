const express = require("express");
var UserController=require('../controllers/user')

//var md_auth=require('../middlewares/authenticated')
var api=express.Router();

//var multipart=require('connect-multiparty');
//var md_upload=multipart({uploadDir:'./uploads/users'})
api.post('/register',UserController.save_user);

module.exports=api;
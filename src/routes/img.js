const express = require("express");
const api=express.Router();
const Controller = require('../controllers/img')

api.post('/upload', Controller.uploadFile);


module.exports=api;


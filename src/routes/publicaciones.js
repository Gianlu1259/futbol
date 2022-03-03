const express = require("express");
const api=express.Router();
const ControllerPublication = require('../controllers/publicaciones')


api.post('/newPublicacion',ControllerPublication.newPublication);
api.get('/getFollowingPublication/:num_page', ControllerPublication.getFriendsPublication);


module.exports=api;


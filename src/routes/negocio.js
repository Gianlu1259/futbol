const express = require("express");
const api=express.Router();
const controllerNegocio = require('../controllers/negocio');

api.post('/createNegocio', controllerNegocio.createNegocio);
api.put('/dejarDeSeguir',controllerNegocio.unfollowNegocio)
api.post('/seguir', controllerNegocio.followingNegocio);
api.post('/crearCancha',controllerNegocio.createCancha);
api.delete('/deleteCancha', controllerNegocio.deleteCancha)
// api.get('/getFriendsPublication/:num_page',controllerNegocio.getFriendsPublication)


module.exports=api;
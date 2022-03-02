var Evento=require('../models/evento');
const user = require('../models/user');
const canchaService = require('../services/canchaServices')

//registro
async function newEvento(req,res){
    
    let usuario = req.user
    if(!usuario){
        return res.status(404).send({message:'usted no tiene permiso para realizar esta operacion'});
    }
    var params=req.body;
    const response = await canchaService.saveCancha(usuario,params);
    if(response.success){
        return res.status(404).send(response.content);
    }
    
    return res.status(200).send(response.content);
   
}

function get_cancha(req,res){
    Evento.findOne().exec((err,cancha)=>{
        if(err) return res.status(500).send({message:"error al devolver la cancha"});
        if(cancha){
            res.status(200).send({cancha:cancha});
        }
        else{
            res.status(404).send({message:'no se ah encontrado ninguna cancha'});
        }
    })
}

function delete_cancha(req,res){
    Evento.deleteOne({}).exec((err,result)=>{
        if(err) res.status(500).send("error al eliminar la cancha");
        if(result) res.status(200).send("se ah eliminado la cancha con exito!");
        else{res.status(404).send("no se ah logrado eliminar");}
    })
}

module.exports={
    newEvento,
    get_cancha,
    delete_cancha
}
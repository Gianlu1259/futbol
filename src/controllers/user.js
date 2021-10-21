var User=require('../models/user');

//registro
function save_user(req,res){
    var params=req.body//guardo todos los datosque recibo por parametro
    var user=new User();
    if(params.name && params.confirmado){
        user.name=params.name
        user.confirmado=params.confirmado
    }
    user.save((err,UserStored)=>{
        if(err) return res.status(500).send({message:"error al guardar usuario"});
        if(UserStored) return res.status(200).send({user:UserStored});
        else{
            res.status(404).send({message:'no se ah registrado el usuario'});
        }
    })
}

module.exports={
    save_user
}
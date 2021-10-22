var User=require('../models/user');
var Cancha=require('../models/cancha');
var canchaControllers=require('./cancha');
//registro
function save_user(req,res){
    var params=req.body//guardo todos los datosque recibo por parametro
    var user=new User();
    if(params.name){
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

function get_user(req,res){
    User.find({"confirmado":true}).estimatedDocumentCount().exec((err,count)=>{
        var count=count;
        Cancha.findOne({},{"_id":0,"precio":1}).exec((err,precio)=>{
            if(err) res.status(500).send({message:'error en el servidor'})
            if(precio){
                var precio=precio["precio"];
                User.find().exec((err,users)=>{
                    if(err) return res.status(500).send({message:"error al devolver los ususarios"});
                    if(users){
                        res.status(200).send({
                            users:users,
                            pago:precio/count
                        });
                    }
                    else{
                        res.status(404).send({message:'no se ah encontrado ningun usuario'});
                    }
                })
            }
            else {res.status(404).send("no existe ninguna cancha")}
            
        })
        
    })
}

function get_count(req,res){
    Cancha.findOne({},{"_id":0,"precio":1}).exec((err,precio)=>{
        if(precio) res.status(200).send({precio:precio})
    })
}

module.exports={
    save_user,
    get_user
}
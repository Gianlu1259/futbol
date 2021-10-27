var User=require('../models/user');
var Cancha=require('../models/cancha');

//registro
function save_user(req,res){
    var params=req.body//guardo todos los datosque recibo por parametro
    var user=new User();
    User.find({"confirmado":true}).count().exec((err,count)=>{
        Cancha.findOne().exec((err,cancha)=>{
            if(count<cancha["cantMax"]){
                if(params.name){
                    user.name=params.name
                    user.confirmado=params.confirmado
                    user.save((err,UserStored)=>{
                        if(err) return res.status(500).send({message:"error al guardar usuario"});
                        if(UserStored) return res.status(200).send({user:UserStored});
                        else{
                            res.status(404).send({message:'no se ah registrado el usuario'});
                        }
                    })
                }
                else res.send({message:"los datos enviados no son validos"});
            }
            else res.send({menssage:"se a alcanzado la cantidad maxima de jugadores confirmados, intenta mas tarde"})
        })
    })
}

function get_user(req,res){
    User.find({"confirmado":true}).count().exec((err,count)=>{
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

function update_user(req,res){
    var user_id=req.params.id;
    var update=req.body;

    if(update.confirmado=="false"){ 
        User.findByIdAndUpdate(user_id,update,{new:true}).exec((err, update)=>{
            if(err) return res.status(500).send({message:'Error en la peticion'})
            if(update) return res.status(200).send({user_update:update}) 
            else return res.status(404).send({message:'no se ah podido actualizar el usuario'}) //le paso los datos del usuario actualizado
        })
    }
    else{
        User.find({"confirmado":true}).count().exec((err,count)=>{
            Cancha.findOne().exec((err,cancha)=>{
                if(count<cancha["cantMax"]){
                    User.findByIdAndUpdate(user_id,update,{new:true}).exec((err, update)=>{
                        if(err) return res.status(500).send({message:'Error en la peticion'})
                        if(update) return res.status(200).send({user_update:update}) 
                        else return res.status(404).send({message:'no se ah podido actualizar el usuario'}) //le paso los datos del usuario actualizado
                    })
                }
                else{
                    return res.send({message:"se a alcanzado la cantidad maxima de jugadores confirmados, intenta mas tarde"})
                }  
            })
        })
    }
    
}

function delete_users(req,res){
    User.deleteMany({}).exec((err,result)=>{
        if(err) res.status(500).send("error al eliminar los usuarios");
        if(result) res.status(200).send("se ah eliminado los usuarios con exito!");
        else{res.status(404).send("no se ah logrado eliminar los usuarios");}
    })
}

module.exports={
    save_user,
    get_user,
    update_user,
    delete_users
}
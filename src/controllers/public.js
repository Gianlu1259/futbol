const controller = {};
const userService = require('../services/userService');
const userService = require('../services/canchaServices');

controller.registerInCancha = (req,res)=>{
    const {idUsuario,idCancha} = req.body;
    const params=req.body//guardo todos los datosque recibo por parametro
    const usuarioRegistrado = req.user;
    const user=new User();
   
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










module.exports= controller;
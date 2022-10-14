const User=require('../models/user');
const Cancha=require('../models/evento');
const Team = require("../models/teams")
const userService = require('../services/userService');
const canchaService = require('../services/canchaServices');
const serviceTeams = require("../services/teamsService")
const res = require('express/lib/response');

//registro
async function save_user(req,res){
    const paramss=req.body//guardo todos los datosque recibo por parametro
    const usuarioRegistrado = req.user;
    const {idUsuario,idCancha} = req.params;
    const existCancha =await canchaService.findOneCancha(idCancha);
    const existUser =await userService.findOneById(idUsuario);
    if(!existCancha.success){
        res.status(404).send(existCancha.content);
    }
    if(!existUser.success){
        res.status(404).send(existUser.content);
    }
    const user=new User();
    if(usuarioRegistrado){
        const numeroUsuarios =await User.find({cancha:idCancha}).count().exec()
        if(numeroUsuarios < existCancha.content.cantMax){
            usuarioRegistrado.inscripto.push(idCancha);
            const response =await usuarioRegistrado.save();
            res.status(200).send({message:'se ha registrado el usuario correctamente'});
        }
        else res.send({menssage:"se a alcanzado la cantidad maxima de jugadores confirmados, intenta mas tarde"});
    }
    else{
        User.find({inscripto:idCancha}).count().exec((err,count)=>{
            Cancha.find({_id:idCancha}).exec(async (err,cancha)=>{
                if(count<existCancha.content.cantMax){
                    if(paramss.name){
                        user.name=paramss.name
                        user.confirmado=paramss.confirmado
                        user.rol1 = paramss.rol1
                        user.rol2 = paramss.rol2
                        user.inscripto.push(idCancha)
                        if(count+1===existCancha.content.cantMax){
                            const usersForTeams = await User.find().exec();
                            usersForTeams.push(user)
                            const responseTeam = serviceTeams.createTeam(usersForTeams,2);
                            const teams = new Team();
                            teams.Team1 = responseTeam.team1;
                            teams.Team2 = responseTeam.team2;
                            teams.evento.push(idCancha)
                            teams.save(err=>{
                                if(err) return res.status(500).send({message:"error al guardar el equipo"});
                            })
                        } 
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
    
}

const getTeam = async (req,res)=>{
    const usuarios =await User.find().exec();
    const responseTeam = serviceTeams.createTeam(usuarios,2);
    return res.status(200).json({
        equipo1 : responseTeam.team1,
        equipo2: responseTeam.team2
    })
}

const get_user_registered = (req,res)=>{
    const usuarioRegistrado = req.user;
    return res.status(200).json({
        user:usuarioRegistrado
    })
}

const get_userNotRegistered = async(req,res)=>{
    const {idUsuario,idCancha } = req.params;
    const userExist =await userService.findOneById(idUsuario);
    if(!userExist.success){
        return res.status(400).send(userExist.content);
    }
    const canchaExist =await canchaService.findOneCancha(idCancha);
    if(!canchaExist.success){
        return res.status(400).send(canchaExist.content);
    }
    const canchaPertenece =await userExist.content.cancha.map(id=>{
        if(id===idCancha){
            return true;
        }
    })
    if(!canchaPertenece){
        return res.status(400).send({message:'the user doesn´t have this cancha'});
    }
    const usuarios =await User.find({inscripto:idCancha}).exec()
    const teams = await Team.find({evento:idCancha})
    const cantidadUsuarios = usuarios.length
    const precioCancha = await Cancha.findOne({},{"_id":0,"precio":1}).exec();
    const valorApagar = precioCancha.precio/cantidadUsuarios;
    return res.status(200).send({usuarios,pago:valorApagar,teams});
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

function delete_user(req,res){
    var user_id=req.body._id;
    User.findByIdAndDelete(user_id).exec((err,result)=>{
        if(err) res.status(500).send("error al eliminar usuario");
        if(result) res.status(200).send("se ah eliminado el usuario con exito!");
        else{res.status(404).send("no se ah logrado eliminar");}
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
    delete_users,
    delete_user,
    get_userNotRegistered,
    get_user_registered,
    getTeam
}


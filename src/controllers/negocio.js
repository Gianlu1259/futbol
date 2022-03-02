const NegocioModel = require('../models/negocio');
const EventoModel = require('../models/evento')
const CanchaModel = require('../models/cancha')
const userService = require('../services/userService')
const UserModel = require('../models/registeredUsers');
const user = require('../models/user');
const Controller = {};

Controller.createNegocio = async (req,res)=>{
    let usuario = req.user;
    const {nombre,direccion,horaOpen,horaClose} = req.body;
    if(!nombre && !direccion && !horaOpen && !horaClose){
        return res.status(403).json({
            error:"the fields are empty"
        })
    }
    const negocio = new NegocioModel({
        nombre,
        direccion,
        horaOpen,
        horaClose
    })
    const negocioSaved = await negocio.save();
    if(!negocioSaved){
        return res.status(403).json({
            error:"Negocio don´t create"
        })
    }
    usuario.negocio = negocioSaved._id
    const isValid = await usuario.save()
    if(!isValid){
        return res.status(500).json({
            error:"Internal server Error"
        })
    }
    
    return res.status(200).json({
        message:"Negocio created correctly in " + usuario.name
    })
}

Controller.followingNegocio = async(req,res)=>{
    let usuario = req.user;
    const {idNegocio} = req.body;
    if(!idNegocio){
        return res.status(401).json({
            error:"an idNegocio is necessary"
        })
    }

    const isUser = await userService.findOneById(idNegocio);
    if(isUser.success){
        isUser.content.followers.push(usuario._id)
        usuario.following.push(idNegocio);
        const responseUser = await isUser.content.save();
        if(!responseUser){
            return res.status(500).json({
                error:"Internal server Error"
            })
        }
        const responseUserToUser = await usuario.save();
        if(!responseUserToUser){
            return res.status(500).json({
                error:"Internal server Error"
            })
        }
        return res.status(200).json({message:"following correctly"})
    }

    let negocio = await NegocioModel.findById(idNegocio);
    if(!negocio){
        return res.status(401).json({
            error:"an idNegocio is expected"
        })
    }
    negocio.followers.push(usuario._id)
    usuario.negociosFollowing.push(idNegocio);
    const responseNegocio = await negocio.save()
    if(!responseNegocio){
        return res.status(500).json({
            error:"Internal server Error"
        })
    }
    const response = await usuario.save();
    if(!response){
        return res.status(500).json({
            error:"Internal server Error"
        })
    }
    return res.status(200).json({message:"following correctly"})
}


Controller.unfollowNegocio = async(req,res)=>{
    let usuario = req.user;
    let {idNegocio} = req.body;
    if(!idNegocio){
        return res.status(401).json({
            error:"an idNegocio is necessary"
        })
    }
    const isUser = await UserModel.findById(idNegocio)
    if(isUser){
       try{ 
            let usuario2 = isUser;
            const responseArrayUser2 = usuario2.followers.pull(usuario._id)
            usuario2.followers = responseArrayUser2;
            const responseUser = await usuario2.save();
            if(!responseUser){
                return res.status(500).json({
                    error:"Internal server Error"
                })
            }
            const responseArrayUsuario = usuario.following.filter(palabra => palabra != idNegocio);
            usuario.following = responseArrayUsuario;
            const responseUserx = await usuario.save();
            if(!responseUserx){
                return res.status(500).json({
                    error:"Internal server Error"
                })
            }
            return res.status(200).json({messaje:"unfollowed successfully"})
    }
        catch(error){
            console.log(error)
        }
    }
    else{
        let negocio = await NegocioModel.findById(idNegocio);
        if(!negocio){
            return res.status(401).json({
                error:"an idNegocio is expected"
            })
        }
        const responseArrayNegocio = negocio.followers.filter(palabra => palabra != usuario._id)
        negocio.followers = responseArrayNegocio;
        const responseNegocio = await negocio.save();
        if(!responseNegocio){
            return res.status(500).json({
                error:"Internal server Error"
            })
        }
    }
    const responseArrayUsuario = usuario.negociosFollowing.filter(palabra => palabra != idNegocio)
    usuario.negociosFollowing = responseArrayUsuario
    const responseUser = await usuario.save()
    if(!responseUser){
        return res.status(500).json({
            error:"Internal server Error"
        })
    }
    res.status(200).json({messaje:"unfollowed successfully"})
}


Controller.getFriendsPublication = async (req,res)=>{
    let usuario = req.user;
    let {num_page} = req.params
    num_page = parseInt(req.params.num_page)
    const skip_page = (num_page-1)*10;
    const publicationFollowingUsers = await UserModel.find({followers:usuario._id},{cancha:1,_id:0}).skip(skip_page).limit(10).exec() 
    let listaDeEventos= [];
    for (let index = 0; index < publicationFollowingUsers.length; index++) {
        const user = publicationFollowingUsers[index];
        for (let index = 0; index < user.cancha.length; index++) {
            const evento = user.cancha[index];
            listaDeEventos.push(await EventoModel.findById(evento).exec())
        }
    }
    res.status(200).json({
        eventos_de_seguidos: listaDeEventos
    })
}

Controller.createCancha= async (req,res)=>{
    const userLogued = req.user;
    if(userLogued.negocio === null){
        return res.status(401).json({
            error:"this user hasn´t a negocio"
        })
    }
    const idNegocio = userLogued.negocio;
    const negocio = await NegocioModel.findById(idNegocio);
    if(!negocio){
        return res.status(403).json({
            error:"the Negocio wasn´t found"
        })
    }
    const {nombre,horas,tamaño,precio,cantMax} = req.body;
    const cancha = new CanchaModel({
        nombre,
        disponibilidad:true,
        tamaño,
        precio,
        cantMax,
    })
    const response = await  cancha.save();
    if(!response){
        return res.status(403).json({
            error:"error creating the cancha"
        })
    }
    return res.status(200).json({
        message:"the cancha created correctly in the " + negocio.nombre
    })
}
Controller.deleteCancha  = async (req,res)=>{
    let usuario = req.user;
    const {idCancha} = req.body
    usuario.cancha.pull(idCancha)
    const response = await usuario.save();
    if(!response){
        return res.status(500).json({
            error:"Internal server Error"
        })
    }
    res.status(200).json({
        message:"cancha delete correctly"
    })
}



module.exports = Controller;

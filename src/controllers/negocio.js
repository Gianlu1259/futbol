const NegocioModel = require('../models/negocio');
const Controller = {};

Controller.createNegocio = async (req,res)=>{
    let usuario = req.user;
    const {nombre,direccion,horaOpen,horaClose,photo} = req.body;
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



module.exports = Controller;

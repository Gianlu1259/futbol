const Evento =require('../models/evento')
const service = {};

service.findOneCancha = async (id) =>{
    let serviceResponse= {
        success:true,
        content:{}
    }
    console.log(id)
    const evento =await Evento.findById(id).exec();
    
    if(!evento){
        return serviceResponse= {
            success:false,
            content:{
                message:"could not find evento"
            }
        }
    }
    return serviceResponse= {
        success:true,
        content:evento
    }
}

service.saveCancha = async(usuario,{nombre,direccion,precio,cantMax,horas})=>{
    let serviceResponse= {
        success:true,
        content:{}
    }
    const cancha = new Evento()
    if(nombre && direccion && precio && cantMax && horas){
        cancha.nombre=nombre;
        cancha.direccion=direccion;
        cancha.precio=precio;
        cancha.cantMax=cantMax;
        cancha.horas=horas
        
        const canchaRespose = await cancha.save();
        if(!canchaRespose){
            return serviceResponse= {
                success:false,
                content:{
                    message:"error to save cancha "
                }
            }
        }
        // this.findOneCancha()
        usuario.cancha.push(canchaRespose._id);
        usuario.save()
        serviceResponse.content = {message:"cancha created correctly"}
        return serviceResponse

    }
    else{
        return serviceResponse= {
            success:false,
            content:{
                message:"all fields are required"
            }
        }
    }      

}



module.exports = service;

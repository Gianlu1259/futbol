const PublicationModel = require('../models/publication');
const service = {};


service.savePublication = async (user,{descripcion,evento}) =>{
    let serviceResponse = {
        success: true,
        content: {message:"publication create correctly"}
    }
        if(!descripcion){
            return serviceResponse = {
                success: false,
                content: {
                    error:"the descripcion is expected"
                }
            } 
        }
        if(!evento){
            return serviceResponse = {
                success: false,
                content: {
                    error:"the evento is expected"
                }
            } 
        }
        const publication = new PublicationModel({
            descripcion,
            evento
        })
        const response = await publication.save()
        if(!response){
            return serviceResponse = {
                success: false,
                content: {
                    error:"error to create a publication"
                }
            }
        }
        user.publicaciones.push(response._id)
        const responseCreatedUser = user.save()
        if(!responseCreatedUser){
           return serviceResponse = {
                success: false,
                content: {
                    error:"internal server error"
                }
            }
        }
        return serviceResponse = {
            success: true,
            content: {
                message:"publication create correctly"
            }
        }
}




module.exports = service;
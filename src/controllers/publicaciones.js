const controller = {}
const ServicePublication = require('../services/publicaciones')
const PublicacionModel = require('../models/publication')
const UserModel = require('../models/registeredUsers')

controller.newPublication =(req,res)=>{
    let usuario = req.user
    if(!usuario){
        return res.status(404).send({message:'you don´t have permission to perform this operation'});
    }
    const responsePublication = ServicePublication.savePublication(usuario,req.body);
    if(responsePublication.success){
        return res.status(401).json(responsePublication.content)
    }
    return res.status(200).json(responsePublication.content)

}


controller.getFriendsPublication = async (req,res)=>{
    let usuario = req.user;
    let {num_page} = req.params
    num_page = parseInt(req.params.num_page)
    const skip_page = (num_page-1)*10;
    const publicationFollowingUsers = await UserModel.find({followers:usuario._id},{publicaciones:1,_id:0}).skip(skip_page).limit(10).exec() 
    let listPublication= [];
    for (let index = 0; index < publicationFollowingUsers.length; index++) {
        const user = publicationFollowingUsers[index];
        for (let index = 0; index < user.publicaciones.length; index++) {
            const evento = user.publicaciones[index];
            listPublication.push(await PublicacionModel.findById(evento).exec())
        }
    }
    res.status(200).json({
        publicaciones_de_seguidos: listPublication
    })
}




module.exports = controller;
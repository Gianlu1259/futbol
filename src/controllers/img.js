const Controller= {}

Controller.uploadFile =async (req,res) =>{
    let user = req.user;
    const server = process.env.SERVER || "https://futbolito.herokuapp.com/";
    user.img = server+'img/'+req.file.filename
    const response =await user.save();
    if(!response){
        return res.status(401).json({
            message:"error al guardar la imagen"
        })
    }
    return res.status(200).json({
        message:"imagen subida correctamente"
    })
}

module.exports = Controller;
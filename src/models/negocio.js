const moongose=require('mongoose');
var negocioSchema=moongose.Schema({
    nombre:{
        type:String,
        require:true
    },
    direccion:String,
    horaOpen:Date,
    horaClose:Date,
    photo:String
    
});
module.exports=moongose.model('Negocio',negocioSchema);
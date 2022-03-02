const moongose=require('mongoose');
var negocioSchema=moongose.Schema({
    nombre:{
        type:String,
        require:true
    },
    direccion:String,
    horaOpen:String,
    horaClose:String,
    photo:String,
    cancha:{
        type:[{
            type:moongose.Schema.Types.ObjectId,
            ref:'Cancha'
        }]
        
    },
    followers:{
        type:[{
            type:moongose.Schema.Types.ObjectId,
            ref:'registeredUser'
        }]
    },
    following:{
        type:[{
            type:moongose.Schema.Types.ObjectId,
            ref:'registeredUser'
        }]
    }
    
});
module.exports=moongose.model('Negocio',negocioSchema);
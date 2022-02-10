const moongose=require('mongoose');
var canchaSchema=moongose.Schema({
    nombre:{
        type:String,
        require:true
    },
    disponibilidad:Boolean,
    horas:Number,
    tamaño:Number,
    precio:Number,
    cantMax:Number
    
});
module.exports=moongose.model('Cancha',canchaSchema);
const moongose=require('mongoose');
var canchaSchema=moongose.Schema({
    nombre:{
        type:String,
        require:true
    },
    direccion:String,
    horas:Number,
    precio:Number,
    cantMax:Number
});
module.exports=moongose.model('Cancha',canchaSchema);
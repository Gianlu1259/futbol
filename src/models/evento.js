const moongose=require('mongoose');
var eventoSchema=moongose.Schema({
    nombre:{
        type:String,
        require:true
    },
    direccion:String,
    horas:Number,
    precio:Number,
    cantMax:Number
});
module.exports=moongose.model('Evento',eventoSchema);
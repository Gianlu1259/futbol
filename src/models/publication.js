const moongose=require('mongoose');
var publicationSchema=moongose.Schema({
    descripcion:String,
    evento:{
        type:moongose.Schema.Types.ObjectId,
        ref:'Evento'
    },
    likes:{
        type:[{
            type:moongose.Schema.Types.ObjectId,
            ref:'registeredUser'
        }]
    }
},{
    timestamps:true
});
module.exports=moongose.model('Publication',publicationSchema);
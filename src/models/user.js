const moongose=require('mongoose');

const userSchema=moongose.Schema({
    name:{
        type:String,
        require:true
    },
    confirmado:Boolean,
    inscripto:{
        type:[{
            type:moongose.Schema.Types.ObjectId,
            ref:'Cancha'
        }]
    },
    rol1:{
        type:String,
    },
    rol2:{
        type:String,
    }
    
})

module.exports=moongose.model('User',userSchema)
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
    }
    
})

module.exports=moongose.model('User',userSchema)
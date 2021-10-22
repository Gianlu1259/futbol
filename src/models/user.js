const moongose=require('mongoose');

const userSchema=moongose.Schema({
    name:{
        type:String,
        require:true
    },
    confirmado:Boolean
    
})

module.exports=moongose.model('User',userSchema)
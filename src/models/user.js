const moongose=require('mongoose');

const userSchema=moongose.Schema({
    name:{
        type:String,
        require:true
    },
    confirmado:{
        type:Boolean,
        require:true
    }
})

module.exports=moongose.model('User',userSchema)
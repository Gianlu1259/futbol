const moongose=require('mongoose');

const rolSchema=moongose.Schema({
    codigo:{
        type:Number,
        require:true
    },
    nombre:String    
})

module.exports=moongose.model('rol',rolSchema)
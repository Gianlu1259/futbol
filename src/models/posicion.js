const moongose=require('mongoose');

const positionSchema=moongose.Schema({
    name:{
        type:String,
        require:true
    },
    numero:Number    
})

module.exports=moongose.model('Position',positionSchema)
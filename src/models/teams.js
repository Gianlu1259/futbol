const moongose=require('mongoose');

const TeamSchema=moongose.Schema({
    Team1:{
        type:[{
            type:moongose.Schema.Types.ObjectId,
            ref:'User'
        }]
    },
    Team2:{
        type:[{
            type:moongose.Schema.Types.ObjectId,
            ref:'User'
        }]
    },
    evento:{
        type:[{
            type:moongose.Schema.Types.ObjectId,
            ref:'Evento'
        }]
    }
},{
    timestamps:true
})

module.exports=moongose.model('Team',TeamSchema);
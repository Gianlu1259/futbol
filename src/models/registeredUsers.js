const moongose=require('mongoose');
const Crypto = require('crypto');

const userRegisteredSchema=moongose.Schema({
    userName:{
        type:String,
        require:true
    },
    email:{
        type:String,
    },
    hashedPassword:{
        type:String,
        default:"",
    },
    name:{
        type:String,
        require:true,
    },
    img:String,
    cancha:{
        type:[{
            type:moongose.Schema.Types.ObjectId,
            ref:'Evento',
        }]
    },
    publicaciones:{
        type:[{
            type:moongose.Schema.Types.ObjectId,
            ref:'Publication',
        }]
    },
    inscripto:{
        type:[{
            type:moongose.Schema.Types.ObjectId,
            ref:'Evento'
        }]
    },
    ubicacion:String,
    position:{
        type:moongose.Schema.Types.ObjectId,
        ref:'Position'
    },
    reputacion:Number,
    followers:{
        type:[{
            type:moongose.Schema.Types.ObjectId,
            ref:'registeredUser'
        }]
    },
    following:{
        type:[{
            type:moongose.Schema.Types.ObjectId,
            ref:'registeredUser'
        }]
    },
    negocio:{
        type:moongose.Schema.Types.ObjectId,
        ref:'Negocio'
    },
    negociosFollowing:{
        type:[{
            type:moongose.Schema.Types.ObjectId,
            ref:'Negocio'
        }]
    }
},{
    timestamps:true
})
userRegisteredSchema.methods.setImagUrl = ()=>{

}

userRegisteredSchema.virtual("password").set(function(password){
    this.hashedPassword = Crypto.createHmac("sha256",password).digest("hex");
});

userRegisteredSchema.methods = {
    comparePassword: function(password){
        return(Crypto.createHmac("sha256",password).digest("hex")===this.hashedPassword);
    }
}

module.exports=moongose.model('registeredUser',userRegisteredSchema)
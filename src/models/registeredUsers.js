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
    photo:String,
    cancha:{
        type:[{
            type:moongose.Schema.Types.ObjectId,
            ref:'Cancha',
        }]
    }  
},{
    timestamps:true
})

userRegisteredSchema.virtual("password").set(function(password){
    this.hashedPassword = Crypto.createHmac("sha256",password).digest("hex");
});

userRegisteredSchema.methods = {
    comparePassword: function(password){
        return(Crypto.createHmac("sha256",password).digest("hex")===this.hashedPassword);
    }
}

module.exports=moongose.model('registeredUser',userRegisteredSchema)
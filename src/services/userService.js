const UserRegisteredModel = require('../models/registeredUsers')
const service = {};

service.verifyRegisterFields = ({username,email,password,name}) => {
    let serviceResponse= {
        success:true,
        content:{}
    }
    if(!username || !email || !password || !name){
        serviceResponse= {
            success:false,
            content:{
                error:"all fields is required"
            }
        }
        return serviceResponse;
    }
    if(password.match('/^\s+$/')===null){
        if(password.length<5){
            serviceResponse={
                success:false,
                content:{
                    error:'the password must be more than 5 characters'
                }
            }
        }  
    
        return serviceResponse;
    }else{
        return serviceResponse={
            success:false,
            content:{
                error:'the password contain whiteSpace'
            }
        }
    }
    
}

service.findOneUsernameEmail = async(username, email)=>{
    let serviceResponse= {
        success:true,
        content:{}
    }
    try {
        const user = await UserRegisteredModel.findOne({
            $or:[{username:username},{email:email}]
        }).exec();
        
        if(!user){
            serviceResponse= {
                success:false,
                content:{
                    error:"User not found"
                }
            }
            return serviceResponse;
        }else{
            serviceResponse.content=user;
        }
        return serviceResponse;
    } catch (error) {
        throw error;
    }
}
service.register = async ({username, email, password,name,photo})=>{
    let serviceResponse = {
        success:true,
        content:{
            message: "User registered"
        }
    }
    try {
        const user = new UserRegisteredModel({
            username:username,
            email:email,
            password:password,
            name:name,
            photo:photo,
        });
        const userSaved = await user.save();
        if(!userSaved){
            serviceResponse={
                success: false,
                content:{
                    error:"User not register"
                }
            }
        }
        return serviceResponse;
    } catch (error) {
        throw error;
    }
}

service.verifyLoginFields=({identifier,password})=>{
    let serviceResponse= {
        success:true,
        content:{}
    }
    if(!identifier || !password){
        serviceResponse= {
            success:false,
            content:{
                error:"Required fields empy"
            }
        }
        return serviceResponse;
    }
    return serviceResponse;
}

module.exports = service;
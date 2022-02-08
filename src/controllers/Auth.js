const controller = {}
const userService = require('../services/userService')
const {createToken} = require('../utils/JWT')
const {OAuth2Client} = require('google-auth-library')
const {verifyToken} = require('../utils/JWT')

const client = new OAuth2Client('766636341826-8382tr10jgd23if06im0vqd0p3d33e5v.apps.googleusercontent.com')


controller.register = async(req,res)=>{
    const verifyFieldsRegister = userService.verifyRegisterFields(req.body);
    if(!verifyFieldsRegister.success){
        return res.status(400).json(verifyFieldsRegister.content);
    }
    try{
            const {username,email}=req.body;
            userExist = await userService.findOneUsernameEmail(username,email);
            if(userExist.success){
                return res.status(409).json({
                    error:"User already exists"
                });
            }
            const userRegistered = await userService.register(req.body)
            if(!userRegistered.success){
                return res.status(409).json(userRegistered.content);
            }
            return res.status(201).json(userRegistered.content);
    }
    catch(error)
    {
        return res.status(500).json({
            error:"Internal server Error"
        })
    }
}

controller.login = async(req,res)=>{
    const fieldsValidation = userService.verifyLoginFields(req.body);
    if(!fieldsValidation.success){
        return res.status(400).json(fieldsValidation.content);
    }
    try {
        const {identifier, password} = req.body;
        const userExist = await userService.findOneUsernameEmail(identifier,identifier);
        if(!userExist.success){
            return res.status(404).json(userExist.content);
        }
        const user = userExist.content;
        if(!user.comparePassword(password)){
            return res.status(401).json({
                error:"Error incorrect password"
            })
        }
        return res.status(200).json({
            token: createToken(user._id),
            responseUser:{
                name:user.name,
                _id:user._id,
                userName:user.userName,
            }
        })
    } catch (error) {
        return res.status(500).json({
            error:'Internal server Error'
        })
    }
}

controller.googleLogin = (req,res)=>{
    const {tokenId} = req.body;
    client.verifyIdToken({idToken:tokenId, audience:'766636341826-8382tr10jgd23if06im0vqd0p3d33e5v.apps.googleusercontent.com'}).then(async (response)=>{
        const {email_verified, name , email, given_name} = response.payload;
        if(email_verified){
            const userExist = await userService.findOneUsernameEmail(email,email);
            const password = email+"queonda";
            try {
                if(!userExist.success){
                    const userRegistered = await userService.register({username:name, email:email, password:password,name:given_name})
                    if(!userRegistered.success){
                        return res.status(409).json(userRegistered.content);
                    }
                    const userExist = await userService.findOneUsernameEmail(email,email);
                    const user = userExist.content;
                    return res.status(200).json({
                        token: createToken(user._id),
                        responseUser:{
                            name:user.name,
                            _id:user._id,
                            userName:user.userName,
                        }
                        })
                }
                const user = userExist.content;
                return res.status(200).json({
                    token: createToken(user._id),
                    responseUser:{
                        name:user.name,
                        _id:user._id,
                        userName:user.userName,
                    }
                })

            }
            catch(error){
                res.status(404).json({
                    message:error.message
                })
            }
            
               
        }
        else{
            res.status(404).json({
                message:"error email not verifield"
            })
        }
    })
}

controller.verifyToken =(req,res)=>{
    const {token} = req.body;
    const tokenVerifyed = verifyToken(token);
    if(!tokenVerifyed){
        return res.status(401).json({
            error:"invalid token ",
        });
    }
    res.status(200).json({
        message:"valid token"
    })
}


module.exports = controller;
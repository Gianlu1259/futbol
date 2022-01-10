const controller = {}
const userService = require('../services/userService')
const {createToken} = require('../utils/JWT')

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

module.exports = controller;
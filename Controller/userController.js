const mongoose=require('mongoose')
const userModel=require('../Model/user')
const jwt=require('jsonwebtoken')
const bcrypt = require('bcrypt');

const userRegistration=async function(req,res){
    try{
     
     console.log(req.body)
     let {fullName,mobile,email,password}=req.body
     if(!fullName || !mobile || !email || !password ){
        return res.status(400).send({status:false, message:"For user registration fullName,mobile,email and password all the field are required"})
     }
     
     const checkEmail=await userModel.findOne({email})
     if(checkEmail){
        return res.status(409).send({status:false, message:"The email is already in use try to login or use another one"})
     }
     const checkPhone=await userModel.findOne({mobile})
     if(checkPhone){
        return res.status(409).send({status:false, message:"The phone is already in use try to login or use another one"})
     }
     password = await bcrypt.hash(req.body.password, 10);
    const createUser=await userModel.create({fullName,mobile,email,password})
    return res.status(201).send({status:true,message:"user Created",data:createUser})
    }
    catch(err){
        return res.status(500).send({status:false, error:err.message})
    }
}

const userLogin=async function(req,res){
    try{
        const {email,password}=req.body
        if(!email || !password){
            return res.status(400).send({status:false,message:"for login email and password is compulsory"})
        }
        const checkUser=await userModel.findOne({email})
        if(!checkUser){
            return res.status(400).send({status:false,message:"invalid Email Id"})
        }
        const checkpassword= await bcrypt.compare(password,checkUser.password)
        if(checkpassword==false){
            return res.status(400).send({status:false,message:"Incorrect Password"})
        }
        const token=jwt.sign(
            {userId:checkUser._id.toString()},
            "task1",
            {expiresIn:"1d"}
        )
        res.setHeader("token",token)
        return res.status(200).send({status:true,message:"login succesfull"})

    }
    catch(err){
        return res.status(500).send({status:false, error:err.message})
    }
}

module.exports={userRegistration,userLogin}
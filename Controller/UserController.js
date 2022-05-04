const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const otpGenerator = require('otp-generator')
const Routes = require('../Routes/UserRoute');
const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const MD5 = require('md5')
const randomNumber = require('random-integer')
const { check, validationResult } = require('express-validator');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Console } = require('console');
const { mail } = require('../Mail/email');
const UserAddress = require('../Models/UserAddress');
const { sms } = require('../Mail/sms');

const SignUp = async (req, res) => {
    await check('email').isEmail(['@','.']).withMessage("invalid email").run(req)
    await check('phoneNo').isLength({min:10,max:15}).withMessage("invalid phoneNo").run(req)

   var result = validationResult(req)
   console.log(result)
   if(!result.isEmpty()){
       return res.send({'error':result.errors[0].msg})
   }
          console.log(req.body)
          let { name, email, phoneNo, role} = req.body
          
      var checkData = await User.findOne({email:email}, {phoneNo:phoneNo})

      if (checkData) {
        return res.status(400).json({message:"User already registered"});
      
      } else { 
        const otp = otpGenerator.generate(4,{digits:true,lowerCaseAlphabets:false,upperCaseAlphabets:false,specialChars:false});
        console.log(otp,"///////////////////")
        let userData = {
          name,
          email,
          phoneNo,
          role,
          otp,  
        };  
    // Create user in our database
    const data = await User.create(userData);
    console.log(data.otp,"..........kkkkkkkkkkk")
    const useremail = await User.findOne({email:data.email})
    const user = useremail.email
    console.log(useremail,"..................")
    mail("","",user ,useremail)
    sms(useremail);
    res.status(201).json({message:"Data registered successfully",result:data});
    }
};

const login = async(req,res)=>{

    if(!req.body.phoneNo){
      return res.status(400).json({error: 'Parameters are missing'})
    }    

    const {phoneNo} = req.body;

    const user = await User.findOne({phoneNo:phoneNo})
    console.log(user._id)
    if(user){
      const otp = otpGenerator.generate(4,{digits:true,lowerCaseAlphabets:false,upperCaseAlphabets:false,specialChars:false});
      const updateOtp = await User.findOneAndUpdate({_id:user._id},{otp:otp});
      console.log(updateOtp.otp,";;;;;;;;;;;;")
        if (updateOtp) {
            
        res.status(200).json({message:"Your otp will be send successfully",phone_number:user.phoneNo,updated_Otp:updateOtp.otp});
      } else {
        res.status(400).json({error:"Invalid otp"});
      }
    }else{
        res.status(400).json({message:"PhoneNo Not Found"});
    }
  };

  const checkOtp = async(req,res,error)=>{

    if(!req.body.phoneNo || !req.body.otp){
      return res.status(400).json({message:"Parameters are missing"})
    }

    try{
      const {phoneNo,otp,lat,long} = req.body
      const checkPhone = await User.findOne({phoneNo:phoneNo})
      console.log(checkPhone._id,"..............")
      console.log(checkPhone.otp)
      if(checkPhone.otp == otp){
        
            // Create token
            let token = jwt.sign({checkPhone},
                "longer-secret-key-is-better",
            {
              expiresIn: "24h",
            }
        );
        const data1 = await UserAddress.create({userId:checkPhone._id ,currentLocation:[lat,long]})

        console.log(data1)
          return res.status(200).json({message:"Login successfully",result:checkPhone,data1, Token:token})
        }else{
          return res.status(400).json({error:error,message:"Invalid otp"})
        }

    }catch(error){
      return res.status(400).send({message:"Something went wrong",error:error})
    }
  };

  const findOtp = async(req,res)=>{
 
    try{
    console.log(req.body,"...................")

      let {otp} = req.body
       
      const data = await User.find({})

      return res.send({message:"success",data:data})

      }catch(error){
          return res.status(400).json({"message":"Something went wrong",error:error})
      }
  };


const list = async(req,res) => {
  try{

    const data = await User.find({})

    if(data){
     
      res.send({message:'List of Users',result:data})
    }
    else{
      res.send("err",error)
    }

  }catch(error){
    res.status(400).send({message:"something went wrong",error:error})
  }
};

const update = async(req,res)=>{
    
    if(!req.body.id){
        return res.send({message:"Parameters are missing"})
    }
    let body = req.body

    const update = await User.updateMany(body)

    if(update){
        return res.status(200).json({message:'User updated successfully',data:update})

    }else{
        return res.send({error:'error'})
    }
};

 const profile = async(req,res)=>{

    try{
   
     const data = req.headers.authorization.replace('Bearer ',''); 

     const data1 = jwt.verify(data, "longer-secret-key-is-better");
     console.log(data1,"............")

     if (data1.userId) {
        const user = await User.findOne(data.userId)
        console.log(user)
      
        const user1 = await User.findOneAndUpdate({

          _id:data.userId,
          email:req.body.email,
          phoneNo:req.body.phoneNo,
          firstName:req.body.name,
          lastName: req.body.lastName
        })
        return res.send({message:"data",result:user1})

      }else{
        res.send("error")
      }
    }catch(error){
      return res.send({message:"something went wrong",error:error})
    }
};

const deleteall = async(req,res)=>{

  try{
    const data = await User.deleteMany({name:"user"})

    console.log(data)
    return res.send({message:"delete",data:data})


  }catch(error){
    return res.status(400).json({message:"something went wrong",error:error})

  }
};
module.exports = {
    SignUp : SignUp,
    login: login,
    list:list,
    update:update,
    profile:profile,
    deleteall:deleteall,
    findOtp:findOtp,
    checkOtp:checkOtp
}

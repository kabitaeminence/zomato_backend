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


const add = async(req,res) => {
  try{

    const {userId,lat,long} = req.body

    let addressData = {
        userId,
        currentLocation : [lat,long]
    }

    const data = await UserAddress.create(addressData)

    if(data){
     
      res.send({message:'Address added successfully',result:data})
    }
    else{
      res.send("err",error)
    }

  }catch(error){
    res.status(400).send({message:"something went wrong",error:error})
  }
};

module.exports = {
    add 
}

var mongoose = require('mongoose');
var Schema = mongoose.Schema

const  UserSchema = new Schema ({
    
    name : {type:String, required:false},
    email : {type:String, require: false},
    phoneNo : {type:Number, require: false},
    otp: {type:Number,require: true},
    role : {type:Number,enum:[1,2],require:true,default:2},
    createdAt:{type:Date,default:Date.now()},
    updatedAt:{type:Date,default:Date.now()}
 
})
const User = mongoose.model('User',UserSchema)
module.exports = User

var mongoose = require('mongoose');
var Schema = mongoose.Schema

const  UserAddressSchema = new Schema ({
    
    userId : {type:Schema.Types.ObjectId,ref:"User"},
    currentLocation : {type:[Number],default:[0,0]},
    
    createdAt:{type:Date,default:Date.now()},
    updatedAt:{type:Date,default:Date.now()}
 
})
const UserAddress = mongoose.model('UserAddress',UserAddressSchema)
module.exports = UserAddress

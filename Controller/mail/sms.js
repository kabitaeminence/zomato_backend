const accountSid = 'AC5fc387d8f672f576ee75ac916dcbbb2d'; 
const authToken = 'd589995b41b33c6054ac82713299feb6'; 
const client = require('twilio')(accountSid, authToken); 
 

const sms = (userdata) => {

console.log(userdata,"++++++++++++++++++")
client.messages 
      .create({      
        body: userdata.otp,
         from: '+12542804237',   
         to: "+91"+userdata.phoneNo
       }) 
      .then(message => console.log(message.sid)) 
      .done();
}

module.exports = { 
  sms
};

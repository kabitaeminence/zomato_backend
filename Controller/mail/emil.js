var nodemailer = require("nodemailer");
const handlebars = require("handlebars")
var path = require('path')
var fs = require('fs');

const mail = async(req,res, useremail , userdata)=>{ 
    const filePath = path.join(__dirname, "./html.html");
    const source = fs.readFileSync(filePath, "utf-8").toString();
    const template = handlebars.compile(source);
    
    var replacements = {
            phoneNo: userdata.phoneNo, // user token phoneNo
            email : userdata.email,// user token email
            otp : userdata.otp
    };
    var htmlToSend = template(replacements);
    console.log("mailer")
    console.log(__dirname)
    var sender = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'archita.eminence@gmail.com',
        pass: 'emiweb#@123'
    } 
    });
 console.log(sender)
 
var mail = {
    from: 'archita.eminence@gmail.com',
    to: useremail,
    subject: 'Sending Email using Node.js',
    text: 'That was easy!',
    html: htmlToSend
};

sender.sendMail(mail, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        res.send('Email sent successfully: '+ info.response);
        console.log('Email sent successfully: '+ info.response);
    }
});

};
module.exports = {
    mail
}

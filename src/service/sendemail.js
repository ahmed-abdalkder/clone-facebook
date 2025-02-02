
const nodemailer = require("nodemailer");

 const sendMail = async(to,subject,html)=>{
const transporter = nodemailer.createTransport({
  service:"gmail",
  auth: {
    user: process.env.gmail,
    pass: process.env.gmail_key,
  },
});

  const info = await transporter.sendMail({
    from: process.env.gmail,  
    to : to ? to :"",  
    subject: subject ? subject:"Hello ✔",   
    html: html ? html: "<b>Hello world?</b>",  
  });
}
module.exports = sendMail 
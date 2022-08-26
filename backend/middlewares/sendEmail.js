const nodeMailer = require('nodemailer');
// const { options } = require('../app');

exports.sendEmail = async(options)=>{
    var transporter = nodeMailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "7886793771c3ac",
          pass: "282fc1da09f883"
        }
      });
    const mailOptions = {
        from:"gudaya2002@gmail.comt",
        to:options.email,
        subject:options.subject,
        text:options.message
    }
    await transporter.sendMail(mailOptions);
}
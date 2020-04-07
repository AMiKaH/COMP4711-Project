const nodemailer = require('nodemailer');

var transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
       user: 'comp4711mailer@gmail.com',
       pass: 'B0W$hOck'
    }
});

function email (receiverEmail, senderFName, receiverFName, subject, body) {
    paddedBody = `Hi ${receiverFName}!\n\n`
    paddedBody += `${senderFName} has sent you an email on knowledgeBase:\n`
    paddedBody += `\t${body}`
    paddedBody += `\n\nRegards,`
    paddedBody += `\nThe knowledgeBase Team!`

    const mailOptions = {
        from: 'knowledgeBase Messenger',
        to: receiverEmail, // List of recipients
        subject: subject,  // Subject line
        text: paddedBody   // email body
    };
    
    transport.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        }
    });
}



module.exports = {
    email: email
}
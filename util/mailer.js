const nodemailer = require('nodemailer');

var transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
       user: 'comp4711@gmail.com',
       pass: 'B0W$hOck'
    }
});

function email () {
    const mailOptions = {
        from: 'comp4711@gmail.com',
        to: 'ameer.kubba@yahoo.com',         // List of recipients
        subject: 'Design Your Model S | Tesla', // Subject line
        text: 'Have the most fun you can in a car. Get your Tesla today!' // email body
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
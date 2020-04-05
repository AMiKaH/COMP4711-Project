let messageContainer = require('../models/message');
const nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
       user: process.env.smtpid || 'a3ed550b256a51',
       pass: process.env.smtppw || 'a3cfcb674a17c0'
    }
});

exports.email = function(req,res,next) {
    console.log("here");
    const message = {
        from: 'elonmusk@tesla.com', // Sender address
        to: 'fake@gmail.com',         // List of recipients
        subject: 'Design Your Model S | Tesla', // Subject line
        text: 'Have the most fun you can in a car. Get your Tesla today!' // Plain text body
    };
    transport.sendMail(message, function(err, info) {
        if (err) {
          console.log(err)
        } else {
          console.log(info);
        }
    });
}

exports.getMessages = function(req,res,next) {

    // Doesn't exist
    let AllMessages = messageContainer.getConversations();

    AllMessages.then((data) => {
        // what goes in place of peoples here?
        res.render('conversationView', { people: data.rows, peoplesCSS: true });
    });
}
 
exports.getMessages = function(req,res,next, conversationID) {

    let specificConversation = messageContainer.getMessage(conversationID);

    specificConversation.then((data) => {
        res.render('conversationView', { people: data.rows, peoplesCSS: true });
    });
}

exports.sendMessage = function(req,res,next) {

    
    //  let m_CID =
    //  let m_ID = 
    //  let s_ID = 
    //  let r_ID =
    //  let time_Date =
    //  let text = req.body.

    let mObject = {
        messageCID = m_CID,
        messageID = m_ID,
        senderID = s_ID,
        receiverID = r_ID,
        timeDate = time_Date,
        text = text
    }

    //Incomplete.
    messageContainer.add(mObject);
    res.redirect(301, 'conversationView');

}


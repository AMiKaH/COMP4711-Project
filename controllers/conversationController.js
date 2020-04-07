let modConvo = require('../models/message');
let modUser = require('../models/user');
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

// GET
// Render the initial start message page
exports.getMessagePage = function(req,res,next) {

    if(req.cookies.signedIn !== "true"){
        res.redirect(301,'/');
        return
    }

    const userBeingVisited = req.cookies.visitorID;

    const getUBV = modUser.getUserByID(userBeingVisited);

    getUBV.then((data) => {



        res.render('messageUser', {
            
            visitedUser: data.rows[0],
            signedIn: true,      
        });

    });


} 

// POST
// Send a message from that message page
exports.postMessagePage = async function(req,res,next) {

    // startConversation requires senderid receiverid subject
    const mSubject = req.body["message-subject"];
    const mDetails = req.body["message-details"];
    const mUserSending = req.cookies.userid;
    const mUserToSendTo = req.cookies.visitorID;
    
    const profileLink = '/profile/' + mUserToSendTo;

    // Start the conversation
    const startConversationWithUser = await modConvo.startConversation({
        senderID : mUserSending,
        receiverID : mUserToSendTo,
        subject : mSubject
    }).then();

    // Need conversation ID

    const getConversationWithUser = modConvo.getConversation(mUserSending);
    const getReceivingUser = modUser.getUserByID(mUserSending);

    let currentConvoID = await Promise.all([getReceivingUser, getConversationWithUser]).then((data) => {

        console.log("Convo");
        console.log(data[1].rows[0].conversationid);
        console.log(mUserSending);
        console.log(mUserToSendTo);
        console.log(mDetails);

        return data[1].rows;

    }).catch((error) => {

        console.log("Error Starting Conversation. ")
        console.log(error);

    });

    console.log(currentConvoID);
    console.log(currentConvoID[0].conversationid);

    await modConvo.sendMsg({
        conversationID: currentConvoID[0].conversationid,
        senderID : mUserSending,
        receiverID : mUserToSendTo,
        text : mDetails
    }).then();

    res.redirect(301, profileLink);
}

// GET
exports.getMessages = async function(req,res,next) {

    // Doesn't exist
    let AllConversations = modConvo.getConversation(req.cookies.userid);

    AllConversations.then(async function(data) {

        let listOfConversations = data.rows;

        for (let convo of listOfConversations) {

            let currentConvoMessages = modConvo.getMsg(convo.conversationid);
            
            convo.messages = await currentConvoMessages.then((data) => {
                
                return data.rows;

            })

        };

        res.render('messages', {
            conversation : listOfConversations,
            signedIn: true
        });
    });
}

exports.sendMessage = function(req,res,next) {

    currentConvoID = Object.keys(req.body)[0];
    currentConvoMsg = req.body["add-reply-text"];

    let specificConvo = modConvo.getSpecificConversation(currentConvoID);

    specificConvo.then((data) => {

        let sender = data.rows[0].senderid;
        if(req.cookies.userid == data.rows[0].senderid)
            sender = data.rows[0].receiverid

        modConvo.sendMsg({
            conversationID: currentConvoID,
            senderID: req.cookies.userid,
            receiverID: sender,
            text: currentConvoMsg

        }).then();

    })

    res.redirect('/messages');

}


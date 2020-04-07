let modConvo = require('../models/message');
let modUser = require('../models/user');
let mailer = require('../util/mailer')

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
    const getSenderUser = modUser.getUserByID(mUserSending);

    let currentConvoID = await Promise.all([getReceivingUser, getConversationWithUser, getSenderUser]).then((data) => {

        let receiverEmail = data[0].rows[0].email;
        let sfName = data[1].rows[0].s_fname;
        let rfName = data[1].rows[0].r_fname;
        
        mailer.email(receiverEmail, sfName, rfName, mSubject, mDetails);

        const sendMessage = modConvo.sendMsg({
            conversationID: data[1].rows[0].conversationid,
            senderID : mUserSending,
            receiverID : mUserToSendTo,
            subject : mSubject,
            text : mDetails
        });
        
        res.render('messages', {
            conversation : data[1].rows,
            signedIn: true         
        });

        return data[1].rows;

    }).catch((error) => {

        console.log("Error Starting Conversation. ")
        console.log(error);

    });

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
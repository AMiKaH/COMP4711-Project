const modUserProfile = require('../models/user');
const modUserPosts = require('../models/post');

//Get
exports.getProfile = function(req,res,next) {

    if(req.cookies.signedIn !== "true"){
        res.redirect(301,'/');
        return
    }

    const currentUser = modUserProfile.getUserByID(req.cookies.userid);
    const currentUsersPosts = modUserPosts.getPosts(req.cookies.userid);

    Promise.all([currentUsersPosts, currentUser]).then((data) => {

        // parsePosts(data[0].rows);

        res.render('visitProfile', {
            profile: data[1].rows[0],
            signedIn: true, 
            userPostList: data[0].rows});
    }).catch((error) => {

        console.log(error);

    });
}

// Post
exports.signup = async function(req,res,next) {

    const sFirstName = req.body["first-name"];
    const sLastName =  req.body["last-name"];

    const sEmail = req.body.email;
    const sPassword = req.body.password;

    const validateSignUp = modUserProfile.getUserByEmail(sEmail);
    const result = await validateSignUp.then((data) => {

        // Not sure if correct
        return (data.rows.length === 0);

        // let addedUser = modUserProfile.addUser(data.email, data.password);
        
    });

    if (!result) {

        throw Error("Failed sign up. User exists, please login");
        // TODO: Redirect
    }

    const addedUser = await modUserProfile.addUser({
        
        email: sEmail, 
        password: sPassword

    });
    // const addedUserResult = await addedUser;

    const getIDByEmail = await modUserProfile.getUserByEmail(sEmail)
        .then((data) => {
            return data.rows[0].userid;
        });

    const updateName = await modUserProfile.addProfile({
    
        userid : getIDByEmail,
        fname : sFirstName,
        lname : sLastName,

    });

    if(getIDByEmail > 0){
        res.cookie('pageNum',0);
        res.cookie('signedIn','true');
        res.cookie('userid',getIDByEmail)
        .redirect('/homepage');
    } else {
        return;
    }


    
}

// Post 
exports.editProfile = function(req,res,next) {

    let updatedProfile = modUserProfile.updateUser;

    updatedProfile.then((data) => {
        res.render('peoples', { people: data.rows, main: true });
    });
}

// Post
exports.editProfileForm = function(req,res,next) {

    // How do we get the profile form?
    let userID = modUserProfile.getUserByID;

    Peoples.then((data) => {
        res.render('editProfile', { main: true });
    });
}


//Post
exports.likeProfile = function(req,res,next) {
    
    let userLiked = modUserProfile.increaseLike;

    userLiked.then((data) => {
        res.render('peoples', { people: data.rows, main: true });
    });
}

function parsePosts(rows){
    let postList = rows;
    postList.forEach(element => {
        if(element.r_text[0] != null){
            for(let i = element.r_text.length - 1; i >= 0; i--){

                let obj = {
                        postid: element.postid,
                        imgUrl : element.r_imgurl[i],
                        replyText : element.r_text[i]

                    }                
                replies.push(obj);
            }
            element.replies = replies;
        }
    });
}

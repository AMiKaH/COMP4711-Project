let modUserProfile = require('../models/user');
let modUserPosts = require('../models/post');

//Get
exports.getProfile = function(req,res,next) {

    let currentUser = modUserProfile.getUserByID(1);
    let currentUsersPosts = modUserPosts.getPosts(1);

    Promise.all([currentUser, currentUsersPosts]).then((data) => {

        let list = parsePosts(data[1].rows);

        res.render('visitprofile', {
            profile: data[0].rows[0],
            signedIn: true, 
            userPostList: data[1].rows});
    });
}
 
// Post
exports.signup = function(req,res,next) {

    let sFirstName = req.body.first-name;
    let sLastName =  req.body.last-name;
    let sEmail = req.body.email;
    let sPassword = req.body.password;

    let signUpInfo = modUserProfile.addUser;

    signUpInfo.then((data) => {
        res.render('peoples', { 
            people: data.rows, 
            peoplesCSS: true });
    });
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
    let replies = [];
    postList.forEach(element => {
        if(element.r_text[0] != null){
            for(let i = element.r_text.length - 1; i >= 0; i--){

                let obj = {
                        imgUrl : element.r_imgurl[i],
                        replyText : element.r_text[i]
                    }                
                replies.push(obj);
                
            }
            element.replies = replies;
        }
    });
}

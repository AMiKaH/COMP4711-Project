let modUserProfile = require('../models/user');
let modUserPosts = require('../models/post');

//Get
exports.getProfile = function(req,res,next) {

    if(req.cookies.signedIn !== "true"){
        res.redirect(301,'/');
        return
    }

    let currentUser = modUserProfile.getUserByID(req.cookies.userid);
    let currentUsersPosts = modUserPosts.getPosts(req.cookies.userid);

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
exports.signup = function(req,res,next) {

    let sFirstName = req.body.first-name;
    let sLastName =  req.body.last-name;

    let sEmail = req.body.email;
    let sPassword = req.body.password;

    let validateSignUp = modUserProfile.userExists(sEmail, sPassword);

    validateSignUp.then((data) => {

        // Not sure if correct
        if (data === 0) {
            let addedUser = modUserProfile.addUser(data.email, data.password);
        }
        
    }).then((data) => {

        

    })

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

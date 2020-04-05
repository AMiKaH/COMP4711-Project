const modUserProfile = require('../models/user');
const modUserPosts = require('../models/post');

//Get
exports.getProfile = function(req,res,next) {

    if(req.cookies.signedIn !== "true"){
        res.redirect(301,'/');
        return
    }

    const currentUser = modUserProfile.getUserByID(req.params.id);
    const currentUsersPosts = modUserPosts.getPosts(req.params.id);

    Promise.all([currentUsersPosts, currentUser]).then((data) => {
        res.render('visitProfile', {
            profile: data[1].rows[0],
            signedIn: true, 
            userPostList: data[0].rows});
    }).catch((error) => {

        console.log("new erro");
        console.log(error);
    })
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
        .redirect('/signup/completion');
    } else {
        return;
    }

}

// Get
exports.completeRegistration = function(req, res, next) {

    res.render('completeRegistration');

}

// Post 
exports.editProfile = function(req,res,next) {

    const infoImgURL = req.body.imageurl;
    const infoAbout = req.body.about;
    const infoCountry = req.body.country;
    const infoDOB = req.body.dob;

    const updatedProfile = modUserProfile.updateUser({
        userid : req.cookies.userid,
        imgurl : infoImgURL,
        about : infoAbout,
        countryid : infoCountry,
        dob : infoDOB
    });

    updatedProfile.then();

    const post = modUserPosts.getRecentPostRe(req.cookies.pageNum);
    const getUser = modUserProfile.getUserByID(req.cookies.userid); 

    Promise.all([post, getUser]).then((data) => {

        parsePosts(data[0].rows);
        
        res.render('homepage', {
        pageTitle:'Home Page',
        pageNum: req.cookies.pageNum,
        profile: data[1].rows[0],
        signedIn: true,
        postList: data[0].rows,
        postNotComplete: req.query.postNotComplete});
    })
}

// Get
exports.editProfileForm = function(req,res,next) {

    res.render('editProfile');

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
        var replies = [];
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

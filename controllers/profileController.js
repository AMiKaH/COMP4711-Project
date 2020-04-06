const modUserProfile = require('../models/user');
const modUserPosts = require('../models/post');
const parse = require('./parse');

//Get
exports.getProfile = function(req,res,next) {

    if(req.cookies.signedIn !== "true"){
        res.redirect(301,'/');
        return
    }

    // if (!req.headers.referer.includes('profile')){
    //     res.cookie('pageNum',0);
    // }

    let pageNum = req.cookies.pageNum;

    // if(pageNum ==="undefined")
    //     pageNum = 0;

    const currentUser = modUserProfile.getUserByID(req.params.id);
    const currentUsersPosts = modUserPosts.getRecentPostWithRepliesBySpecificUser(req.params.id);

    Promise.all([currentUsersPosts, currentUser]).then((data) => {

        console.log("data.rows");
        console.log(data[0].rows);
        console.log(data[1].rows[0].like);
        parse.parsePosts(data[0].rows);

        // Pass over a cookie stating what person's page the user is visiting.
        res.cookie('visitorID', data[1].rows[0].userid);

        console.log(data[1].rows[0]);
        console.log(data[0].rows);


        res.render('visitProfile', {
            // pageNum: req.cookies.pageNum,
            profile: data[1].rows[0],
            signedIn: true, 
            userPostList: data[0].rows});

    }).catch((error) => {

        console.log("new erro");
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

        parse.parsePosts(data[0].rows);
        
        res.render('homepage', {
        pageTitle:'Home Page',
        pageNum: req.cookies.pageNum,
        profile: data[1].rows[0],
        signedIn: true,
        postList: data[0].rows,
        postNotComplete: req.query.postNotComplete});
    });
}

// Get
exports.editProfileForm = function(req,res,next) {

    res.render('editProfile');

}

//Get
exports.likeProfile = function(req,res,next) {

    console.log(req.params.id);
    
    let userLiked = modUserProfile.increaseLike(req.params.id);

    userLiked.then();

}


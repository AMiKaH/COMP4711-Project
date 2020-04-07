const modUserProfile = require('../models/user');
const modUserPosts = require('../models/post');
const parse = require('./parse');

//Get
exports.getProfile = function(req,res,next) {

    if(req.cookies.signedIn !== "true"){
        res.redirect(301,'/');
        return
    }

    pageNum = req.cookies.pageNum;

    if (!req.headers.referer.includes('profile')){
        res.cookie('pageNum',0);
    }

    const currentUser = modUserProfile.getUserByID(req.params.id);
    const currentUsersPosts = modUserPosts.getRecentPostWithRepliesBySpecificUser(req.params.id, pageNum);

    Promise.all([currentUsersPosts, currentUser]).then((data) => {

        parse.parsePosts(data[0].rows);

        console.log('paginate cookie');
        console.log(req.cookies.pageNum);

        pageTitle = data[1].rows[0].fname + ' ' + data[1].rows[0].lname;

        // Pass over a cookie stating what person's page the user is visiting.
        res.cookie('visitorID', data[1].rows[0].userid);

        res.render('visitProfile', {
            pageTitle:  pageTitle,
            pageNum: req.cookies.pageNum,
            profile: data[1].rows[0],
            signedIn: true, 
            postList: data[0].rows});

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
    const sPasswordCOnf = req.body.password2;

    const validateSignUp = modUserProfile.getUserByEmail(sEmail);
    const result = await validateSignUp.then((data) => {

        return (data.rows.length === 0);
        
    });

    if (!result) {
        console.log("User Exists");
        res.redirect(301, '/homepage');
    }

    if (sPassword !== sPasswordCOnf) {

        console.log("Mismatch pass");
        res.redirect(301, '/homepage');
    }

    const addedUser = await modUserProfile.addUser({
        
        email: sEmail, 
        password: sPassword

    });

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
exports.editProfile = async function(req,res,next) {
    const infoImgURL = req.body.imageurl;
    const infoAbout = req.body.about;
    const infoCountry = req.body.country;
    const infoDOB = req.body.dob;

    const getCountryId = await modUserProfile.getCountryID(infoCountry).then();
    const getUserS = modUserProfile.getUserByID(req.cookies.userid);


    getUserS.then((data) => {
        console.log("XXXXXXXXXX");
        console.log(getCountryId.rows.length);

        if (getCountryId.rows.length == 0) {
                res.render('editProfile', {
                    profile:data.rows[0],
                    pageTitle:'Edit Profile',
                    signedIn: true
                })
            .catch(err => {
                res.render('editProfile', {
                    profile:data.rows[0],
                    pageTitle:'Edit Profile',
                    signedIn: true,
                    errorEditing: true
    
                })
                console.log(err)
                return;
            });
        }
        profile:data.rows[0]
    });


    const countryID = getCountryId.rows[0].countryid;

    const updatedProfile = await modUserProfile.updateUser({
        userid : req.cookies.userid,
        imgurl : infoImgURL,
        about : infoAbout,
        countryid : countryID,
        dob : infoDOB
    })
    .then()
    .catch(err => {
        console.log(err)
    });


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
    })
    .catch(err => {
        console.log(err)}
    );
}

// Get
exports.editProfileForm = function(req,res,next) {

    const getUserS = modUserProfile.getUserByID(req.cookies.userid);
    
    getUserS.then((data) => {

        res.render('editProfile', {

            profile:data.rows[0],
            pageTitle:'Edit Profile',
            signedIn: true
        });


    });

}

//Get
exports.likeProfile = function(req,res,next) {
    
    let userLiked = modUserProfile.increaseLike(req.params.id);

    userLiked.then((data) => {

        redirectPage = '/profile/' + (req.params.id).toString();
        res.redirect(301, redirectPage);
    });

}


let express = require('express');
let router = express.Router();
const home = require('../controllers/homepageController');
const loginController = require('../controllers/loginController');
const postController = require('../controllers/postController');
const searchController = require('../controllers/searchController');
const profileController = require('../controllers/profileController');
const conversationController = require('../controllers/conversationController');
const paginator = require('../controllers/paginateController');


router.post('/validateLogin',loginController.validateLogin);

router.post('/addPost',postController.addPost);

router.post('/search',searchController.searchByKeyword);

router.get('/search',searchController.searchByUserID);

router.post('/searchTopic',searchController.searchByTopic);

router.get('/homepage', home.getHomePage);

router.get('/paginator', paginator.paginate);

router.post('/addReply',postController.addReply);

router.post('/logout',loginController.logout);


// Profile Routes
router.get('/profile/:id', profileController.getProfile);

router.post('/profile/like/:id', profileController.likeProfile);

router.post('/signup', profileController.signup);

router.get('/signup/completion', profileController.completeRegistration);

router.post('/signup/completion', profileController.editProfile);

router.get('/edit', profileController.editProfileForm);

router.post('/edit', profileController.editProfile);

// Message Routes

router.get('/messageUser', conversationController.getMessagePage);
router.post('/messageUser', conversationController.postMessagePage);

router.get('/conversation', conversationController.getMessages);


module.exports = router;
let express = require('express');
let router = express.Router();
const home = require('../controllers/homepageController');
const loginController = require('../controllers/loginController');
const postController = require('../controllers/postController');
const searchController = require('../controllers/searchController');
const profileController = require('../controllers/profileController');
const paginator = require('../controllers/paginateController');


router.post('/validateLogin',loginController.validateLogin);

router.post('/addPost',postController.addPost);

router.post('/search',searchController.searchByKeyword);

router.post('/searchTopic',searchController.searchByTopic);

router.get('/homepage', home.getHomePage);

router.get('/paginator', paginator.paginate);

router.post('/addReply',postController.addReply);

router.post('/logout',loginController.logout);


// Profile Routes
router.get('/profile/:id', profileController.getProfile);

router.post('/signup', profileController.signup);

router.get('/signup/completion', profileController.completeRegistration);

router.post('/signup/completion', profileController.editProfile);

router.get('/edit', profileController.editProfileForm);

router.post('/edit', profileController.editProfile);




module.exports = router;
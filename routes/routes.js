let express = require('express');
let router = express.Router();
const home = require('../controllers/homepageController');
const log = require('../controllers/loginController');
const postController = require('../controllers/postController');
const searchController = require('../controllers/searchController');
const profileController = require('../controllers/profileController')

router.post('/validateLogin',log.validateLogin);

router.post('/addPost',postController.addPost);

router.post('/search',searchController.searchByKeyword);

router.post('/searchTopic',searchController.searchByTopic);

router.get('/homepage',home.getHomePage);

router.get('/profile', profileController.getProfile);

module.exports = router;
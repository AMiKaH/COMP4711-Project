let express = require('express');
let router = express.Router();
const home = require('../controllers/homepageController');
const loginController = require('../controllers/loginController');
const postController = require('../controllers/postController');
const searchController = require('../controllers/searchController');

router.post('/validateLogin',loginController.validateLogin);

router.post('/addPost',postController.addPost);

router.post('/search',searchController.searchByKeyword);

router.post('/searchTopic',searchController.searchByTopic);

router.get('/homepage',home.getHomePage);

router.post('/addReply',postController.addReply);

router.get('/logout',loginController.logout);

module.exports = router;
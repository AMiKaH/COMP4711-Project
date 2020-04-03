let express = require('express');
let router = express.Router();
const home = require('../controllers/homepageController');
const log = require('../controllers/loginController');
const postController = require('../controllers/postController');

router.post('/validateLogin',log.validateLogin);

router.get('/homepage',home.getHomePage);

module.exports = router;
let express = require('express');
let router = express.Router();
const home = require('../controllers/homepageController');

router.get('/homepage',home.getHomePage);

module.exports = router;
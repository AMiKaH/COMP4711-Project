let express = require('express');
let router = express.Router();
const profile = require('../controllers/profileController')
router.get('/profile', profile.getProfile);

module.exports = router;
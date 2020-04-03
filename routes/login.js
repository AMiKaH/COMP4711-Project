let express = require('express');
let router = express.Router();
const log = require('../controllers/loginController');

Router.post('/validateLogin',log.validateLogin);

module.exports = router;
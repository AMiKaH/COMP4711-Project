let express = require('express');
let router = express.Router();
const convo = require('../controllers/conversationController');

router.get('/conversation',convo.getMessages);

router.get('/message/email',convo.email);

module.exports = router;
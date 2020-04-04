let express = require('express');
let router = express.Router();
const convo = require('../controllers/conversationController');

router.get('/conversation',convo.getMessages);

module.exports = router;
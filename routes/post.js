const express = require('express');
const postController = require('../controllers/postController');
const router = express.Router();

router.get('/homepage', postController.getRecentPosts);

// router.get('/peoples', peopleController.getAllPeople);

// router.get('/people/add', peopleController.getAddPeople);

// router.get('/people/:id', peopleController.getPeople);

// router.post('/peoples/add', peopleController.postAddPeople)

module.exports = router;

let modPost = require('../models/post');
let moduser = require('../models/user');
const home = require('../controllers/homepageController');
const log = require('../controllers/loginController');
const postController = require('../controllers/postController');
const searchController = require('../controllers/searchController');
const paginator = require('../controllers/paginateController');


exports.paginate = function(req,res,next){
    var pageNumber = req.query.pageNumber

    if (req.headers.referer.includes('homepage')) {
        home.getHomePage(req, res, next, pageNumber)
    } else if (req.headers.referer.includes('search')) {

    } else {

    }
}


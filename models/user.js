let db = require('../util/database');

// add a single individual to the database
function addUser(data) {
    let sql = `INSERT INTO "user" (email, password) VALUES ('${data.email}','${data.password}')`;
    return db.query(sql);
}

// add a single user profile to the database
function addProfile(data) {
    let sql = `INSERT INTO "profile" (userid, fname, lname) VALUES ('${data.userid}', '${data.fname}','${data.lname}')`;
    return db.query(sql);
}

// get all the individuals in the database
function getAllUser() {
    let sql = "SELECT * FROM v_user";
    return db.query(sql);
}

// get a specific individual with id
function getUserByID(id) {
    let sql = `SELECT * FROM v_user WHERE userID = ${id} LIMIT 1`;
    return db.query(sql);
}

function getUserImgByID(id) {
    let sql = `SELECT imgurl FROM v_user WHERE userID = ${id} LIMIT 1`;

    return db.query(sql);
}

// get a specific individual with email
function getUserByEmail(email) {
    let sql = `SELECT * FROM v_user WHERE email = '${email}'`
    return db.query(sql)
}

// check a specific individual with email and password
function userExists(email, pwd) {
    let sql = `SELECT userID FROM "user" WHERE email = '${email}' and password = '${pwd}'`
    return db.query(sql)
}

function getCountryID(name) {
    let sql = `SELECT countryID FROM "country" WHERE upper(countryName) like upper(trim('%${name}%')) limit 1`
    return db.query(sql)
}

// Gets countryname by ID
function getCountryName(id) {
    let sql = `SELECT countryName FROM "country" WHERE countryid = '${id}' limit 1`
    return db.query(sql)
}

// update user information
function updateUser(data) {
    let sql = `UPDATE profile
        SET imgurl = '${data.imgurl}',
            about = '${data.about}',
            countryid = ${data.countryid},
            dob = '${data.dob}'
        WHERE userid = ${data.userid}
    `;
    return db.query(sql)
}

// get user like information
function getLikes(id) {
    let sql = `SELECT like FROM "user" WHERE userID = ${id}`
    return db.query(sql)
}

// increase user like information
function increaseLike(id) {
    let sql = `UPDATE profile SET "like" = "like" + 1 WHERE userid = ${id}`;
    return db.query(sql)
}

module.exports = {
    addUser: addUser,
    addProfile: addProfile,
    getAll: getAllUser,
    getUserByID: getUserByID,
    getUserByEmail: getUserByEmail,
    getUserImgByID: getUserImgByID,
    userExists: userExists,
    updateUser: updateUser,
    getLikes: getLikes,
    increaseLike: increaseLike,
    getCountryID: getCountryID,
    getCountryName: getCountryName
}
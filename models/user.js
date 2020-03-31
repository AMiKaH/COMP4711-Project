let db = require('../util/database');

// add a single individual to the database
function addUser(data) {
    let sql = `INSERT INTO "user" (email, password) VALUES ('${data.email}','${data.password}')`;
    return db.qeury(sql);
}

// get all the individuals in the database
function getAllUser() {
    let sql = "SELECT * FROM v_user";
    return db.qeury(sql);
}

// get a specific individual with id
function getUserByID(id) {
    let sql = `SELECT * FROM v_user WHERE userID = ${id} LIMIT 1`;
    return db.qeury(sql);
}

// get a specific individual with email
function getUserByEmail(email) {
    let sql = `SELECT * FROM v_user WHERE email = '${email}'`
    return db.qeury(sql)
}

// check a specific individual with email and password
function userExists(email, pwd) {
    let sql = `SELECT count(userID) cnt FROM "user" WHERE email = '${email}' and password = '${pwd}'`
    return db.qeury(sql)
}

// get all the posts written by specific user
function getPosts(id) {
    let sql = "SELECT * FROM post WHERE userID = " + id;
    return db.qeury(sql);
}

// update user information
function updateUser(data) {
    let sql = `UPDATE profile
        SET fName = '${data.fName}',
            lName = '${data.lName}',
            imgURL = '${data.imgURL}',
            about = '${data.about}',
            countryID = ${data.countryID},
            DOB = '${data.DOB}'
        WHERE userID = ${data.userID}
    `;
    return db.qeury(sql)
}

// get user like information
function getLikes(id) {
    let sql = `SELECT like FROM "user" WHERE userID = ${id}`
    return db.qeury(sql)
}

// increase user like information
function increaseLike(id) {
    let sql = `UPDATE "user" SET like= like + 1 WHERE id= ${id}`;
    return db.qeury(sql)
}

module.exports = {
    addUser: addUser,
    getAll: getAllUser,
    getUser: getUserByID,
    getUserByID: getUserByID,
    getUserByEmail: getUserByEmail,
    userExists: userExists,
    getPosts: getPosts,
    updateUser: updateUser,
    getLikes: getLikes,
    increaseLike: increaseLike
}
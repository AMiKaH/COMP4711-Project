let db = require('../db/db');

function validateLogin(userId,password) {

    return db.query("Select CASE WHEN Password = " + password + " THEN \'TRUE\' ELSE \'False\'"  
    +"from User where UserId = " + userId);
}

module.exports = {
    valid : validateLogin,
}
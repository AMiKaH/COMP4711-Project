let db = require('../db/db');

function addPeople(e) {
     db.query("Insert into people (names,about,url) VALUES ('" + e.name +"','"+ e.about + "','"+ e.url +"')");
}

function getAllPeople() {
    return db.query('Select * from people');
}

function getPeople(id) {
    return db.query('Select * from people where id = ' + id);
}

module.exports = {
    add : addPeople,
    getall : getAllPeople,
    getpeople: getPeople 
}
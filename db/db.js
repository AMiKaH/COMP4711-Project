const Pool = require('pg').Pool;

const pool = new Pool({  
    host: 'localhost',  
    user: 'root',  
    database: 'peoplebook',  
    password: '',
    port: 5432,
    ssl: true
});  

module.exports = pool;
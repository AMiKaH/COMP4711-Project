const Pool = require('pg').Pool;


const pool = new Pool({  
    host: 'ec2-52-86-33-50.compute-1.amazonaws.com',  
    user: process.env.dbuser || 'olpaqaulblauzp',  
    database: process.env.db || 'd1lkjtscn1bb5t',  
    password: process.env.dbpassword || 'f8918c599026cec2c692176714a81a01a78d05dd9db327ed98e7998fd9d7b4b8',

    port: 5432,
    ssl: true
}); 

module.exports = pool;
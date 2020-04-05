const Pool = require('pg').Pool;

<<<<<<< HEAD
<<<<<<< HEAD
const pool = new Pool({  
    host: 'ec2-52-86-33-50.compute-1.amazonaws.com',  
    user: 'olpaqaulblauzp',  
    database: 'd1lkjtscn1bb5t',  
    password: 'f8918c599026cec2c692176714a81a01a78d05dd9db327ed98e7998fd9d7b4b8',
=======
=======
>>>>>>> dbee34b77923e2bd2e186369442819d38b725821

const pool = new Pool({  
    host: 'ec2-52-86-33-50.compute-1.amazonaws.com',  
    user: 'olpaqaulblauzp',  
    database: 'd1lkjtscn1bb5t',  
    password: 'f8918c599026cec2c692176714a81a01a78d05dd9db327ed98e7998fd9d7b4b8',

<<<<<<< HEAD
>>>>>>> ed55c1ba7fe318ce92e39c76c9698fed9c7562c9
=======
>>>>>>> dbee34b77923e2bd2e186369442819d38b725821
    port: 5432,
    ssl: true
}); 

module.exports = pool;
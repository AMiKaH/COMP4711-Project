const Pool = require('pg').Pool;

const pool = new Pool({  
    host: 'ec2-54-147-209-121.compute-1.amazonaws.com',  
    user: 'obrmjnbuddmbaf',  
    database: 'ddqcnok8dd0rcb',  
    password: 'd320f113f11d66f86618edd8b57ceea8ce900d016866d558fb70952675496af3',
    port: 5432,
    ssl: true
});  

module.exports = pool;
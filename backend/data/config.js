const mysql = require('mysql');

const config = {
    connectionLimit:10,
    host:'localhost',
    user:'root',
    password:'',
    database:'tickets_univer',
    port:3306
}

//create mysql pool
const pool = mysql.createPool(config);

// Export the pool
module.exports = pool;
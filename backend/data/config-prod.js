const mysql = require('mysql');

const config = {
    connectionLimit:10,
    host:'74.84.129.53',
    user:'univer_facebook',
    password:'_xUQz$4c8XT1',
    database:'univer_tickets',
    port:3306
}

//create mysql pool
const pool = mysql.createPool(config);

// Export the pool
module.exports = pool_prod;
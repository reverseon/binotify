const Pool = require('pg').Pool;

const pool = new Pool({
    user : 'postgres',
    host : 'db',
    database : 'binotify_rest',
    password : 'postgres',
    port : 5432
});

module.exports = pool;
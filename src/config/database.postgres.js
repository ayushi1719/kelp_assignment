const {Pool} = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});


pool.connect(error => {
    if(error) return console.log(`Cannot connect to DB, Please check your DB connection: ${error}`);
    console.log('DB COnnection Successful');
})

module.exports = {pool}
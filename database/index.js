const { Pool } = require('pg')
// pools will use environment variables
// for connection information
const pool = new Pool(
  {
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'sdcquestionsandanswers',
    password: process.env.DB_PASS || 'mypassword',
    port: process.env.DB_PORT || 5432,
  }
);

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.log(err)
  } else {
    console.log('Postgres connected!')
  }
});

module.exports = {
  query: (text, params, callback) => pool.query(text, params, callback),
}
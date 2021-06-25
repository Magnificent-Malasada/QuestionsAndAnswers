const { Pool } = require('pg')
const password = require('../config.js').postgres;
// pools will use environment variables
// for connection information
const pool = new Pool(
  {
    user: 'postgres',
    host: 'localhost',
    database: 'sdcquestionsandanswers',
    password: password,
    port: 5432,
  }
)
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.log(err)
  } else {
    console.log('Postgres connected!')
  }
})
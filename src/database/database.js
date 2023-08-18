const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

// Create a connection pool instead of a single connection
const mysqlConeccion = mysql.createPool({
    connectionLimit: 100, // You can adjust the connection limit based on your needs
    host:process.env.DB_HOST,
    user: process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    queueLimit      : 0,
    connectTimeout  : 60 * 60 * 1000, // en milisegundos
    acquireTimeout  : 60 * 60 * 1000, // en milisegundos
    timeout         : 60 * 60 * 1000  // en milisegundos
});

pool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
  });
// You don't need to explicitly connect to the database with a pool

// Export the connection pool
module.exports = mysqlConeccion;
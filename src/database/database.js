const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

// Create a connection pool instead of a single connection
const mysqlConeccion = mysql.createPool({
    connectionLimit: 10, // You can adjust the connection limit based on your needs
    host:process.env.DB_HOST,
    user: process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
});

// DETECTA SI LA CONEXION SE HA CAIDO Y HACE UN RESET AUTOMATICO GRACIAS A LA LIBRERIA DE MYSQL
mysqlConeccion.on('error', (err) => {
    console.error('Error de conexión a la base de datos:', err);

    // Comprobar si el error indica una pérdida de conexión (propiedad 'fatal')
    if (err.fatal) {
        // Toma medidas para reconectar, como solicitar una nueva conexión
        mysqlConeccion.getConnection((connectionError, connection) => {
            if (connectionError) {
                console.error('Error al obtener nueva conexión:', connectionError);
            } else {
                console.log('Reconexión exitosa');
                connection.release(); // Libera la conexión después de usarla
            }
        });
    } else {
        console.log('Errores externos al reinicio')
        throw err;
    }
});

// You don't need to explicitly connect to the database with a pool

// Export the connection pool
module.exports = mysqlConeccion;

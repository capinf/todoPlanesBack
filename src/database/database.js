const mysql = require('mysql2/promise'); // Importamos mysql2 en modo promesa
const dotenv = require('dotenv');
dotenv.config();

const mysqlConeccion = mysql.createPool({ // Creamos el pool de conexiones
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10, // Puedes ajustar este valor según tus necesidades
    queueLimit: 0 // No hay límite para el tamaño de la cola
});

mysqlConeccion.getConnection()
    .then(connection => {
        console.log('Mi conexión se realizó correctamente');
        // Si necesitas ejecutar alguna consulta inicial o realizar alguna tarea después de obtener la conexión, puedes hacerlo aquí.
        // connection.query(...)
        // connection.release(); // Importante liberar la conexión cuando hayas terminado con ella.
    })
    .catch(error => {
        console.error('Mi error es', error);
    });

module.exports = mysqlConeccion; // Exportamos el pool en lugar de la conexión única
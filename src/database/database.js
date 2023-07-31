const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const mysqlConeccion= mysql.createConnection({
    
    host:process.env.DB_HOST,
    user: process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    database:process.env.DB_PORT
});

mysqlConeccion.connect(function(err){
    if(err){
        console.log('mi error es', err);
        return;
    }else{
        console.log('Mi conexion se realizo correctamente');
    }
})

module.exports= mysqlConeccion;
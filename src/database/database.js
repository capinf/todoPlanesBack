const mysql = require('mysql');

const mysqlConeccion= mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'todoplanesweb'
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
const mysqlConeccion = require('./database/database');
const express= require('express');
const router = express();
const multer = require('multer');
const bodyParser = require('body-parser');

const cron = require('node-cron');
console.log('Tarea Premium programada configurada para ejecutarse cada día a la medianoche.');

const publicacionPremiumBaja = () => {
  console.log('Iniciando Premium tarea programada para marcar publicaciones como dadas de baja...');

  // Obtener la fecha actual
  const fechaActual = new Date();

  // Calcular la fecha límite para marcar las publicaciones como dadas de baja (7 días atrás)
  const fechaLimite2 = new Date();
  fechaLimite2.setDate(fechaLimite2.getDate() - 30);

  try {

    // Realiza la consulta para obtener las publicaciones que deben ser marcadas como dadas de baja
    const sql = 'SELECT * FROM todoplanesweb.formulario WHERE fecha < ? AND rolform NOT IN ("admin", "normal")';
    mysqlConeccion.query(sql, [fechaLimite2], (error, results) => {
      if (error) {
        console.error('Error al realizar la consulta:', error);
      } else {
        // El resultado de la consulta estará en la variable "results"
        // utiliza este resultado para actualizar las publicaciones y marcarlas como dadas de baja
        // Con el bucle for recorre el resultado y actualizar cada publicación individualmente

        // Ejemplo de actualización de las publicaciones con un bucle
        for (const publicacion2 of results) {
          // Realizar la actualización para marcar la publicación como dada de baja
          marcarPublicacionPremiumBaja(publicacion2.idFormulario, mysqlConeccion); // Pasamos la conexión a la función
        }

        console.log(`${results.length} publicaciones marcadas como dadas de baja.`);
      }

      // Cerrar la conexión a la base de datos después de completar la tarea
      mysqlConeccion.end();
    });
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
};

  const marcarPublicacionPremiumBaja = (idPublicacion,  mysqlConeccion) => {
      try {
        // Realiza la consulta de actualización para cambiar el estado de alta a baja
        const sqlUpdate = 'UPDATE todoplanesweb.formulario SET estado = "B" WHERE idFormulario = ?';
        mysqlConeccion.query(sqlUpdate, [idPublicacion], (error, results) => {
          if (error) {
            console.error('Error al actualizar la publicación:', error);
          } else {
            console.log(`Publicación con ID ${idPublicacion} marcada como dada de baja.`);
          }
        });
      } catch (error) {
        console.error('Error al realizar la actualización:', error);
      }
    };

// Ejecutar cada día a las (21:22)
cron.schedule('05 12 * * *', () => {
  console.log('Ejecutando tarea programada...');
    // Llamamos a la función que marcará las publicaciones como dadas de baja
    publicacionPremiumBaja();
  });
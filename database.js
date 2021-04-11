const mysql = require('mysql');
const { promisify } = require('util');

const { database } = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err,connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
          console.error('La conexión con la base de datos se cerró');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
          console.error('La base de datos tuvo demasiadas conexiones.');
        }
        if (err.code === 'ECONNREFUSED') {
          console.error('La conexión ha sido rechazada.');
        }
      }
    
      if (connection) connection.release();
      console.log('La base de datos se ha conectado.');
    
      return;
});

pool.query = promisify(pool.query);

module.exports = pool;

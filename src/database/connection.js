// var sql = require('mssql');
import sql from "mssql";

const dbSettings = {
  user: 'admin1',
  password: 'admin',
  server: 'localhost',
  database: 'webstore',
  port: 1433,
  options: {
    encrypt: true, //for azure
    trustServerCertificate: true, // change to true local dev
  },
  // port: '0000' AQUI SE COLOCARIA EL PUERTO EN CASO DE CONFIGURARLO
  // PERO COMO ESTA EL POR DEFECTO NO HAY NECESIDAD
};

export const getConnection = async () => {
  try {
    const pool = await sql.connect(dbSettings);
    return pool;
  } catch (error) {
    console.log(error);
  }
};

export { sql };
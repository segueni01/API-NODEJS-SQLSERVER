import { config } from 'dotenv'; //esta funcion intentara leer las variables de entornos que estan definidas en mi pc

config();

console.log(process.env.PORT);

export default {
  port: process.env.PORT || 4000
};

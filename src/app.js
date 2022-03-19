import express from 'express';
import config from './config';
import productsRoutes from './routes/products.routes';

const cors = require('cors');
const app = express();

//settings
app.set('port', config.port || 3000); //aqui utiliza la variable port en caso de que exista, sino utiliza el puerto 3000

//middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}))


app.use(productsRoutes);

export default app;

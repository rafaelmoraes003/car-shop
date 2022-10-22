import express from 'express';
import errorHandler from './middlewares/errorHandler';
import carsRoute from './routes/cars';
import motorcyclesRoute from './routes/motorcycles';

const app = express();

app.use(express.json());

app.use('/cars', carsRoute);
app.use('/motorcycles', motorcyclesRoute);

app.use(errorHandler);

export default app;

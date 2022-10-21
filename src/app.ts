import express from 'express';
import errorHandler from './middlewares/errorHandler';
import carsRoute from './routes/cars';

const app = express();

app.use(express.json());

app.use('/cars', carsRoute);

app.use(errorHandler);

export default app;

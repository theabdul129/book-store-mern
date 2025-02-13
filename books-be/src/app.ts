// src/app.ts
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import bookRoutes from './routes/bookRoutes';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', bookRoutes);

export default app;
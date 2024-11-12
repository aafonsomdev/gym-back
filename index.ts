import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import auth from './routes/auth';
import { dbConnection } from './database/config';

//For env File
dotenv.config();

const app: Application = express();
dbConnection();

const port = process.env.PORT;

app.use(cors());

// Directorio Público
app.use(express.static('public'));

// Lectura y parseo del body
app.use(express.json());

// Rutas
app.use('/api/auth', auth);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});

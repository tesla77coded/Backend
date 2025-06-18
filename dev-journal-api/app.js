import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import journalRoutes from './routes/journalRoutes.js';

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/journals', journalRoutes);

app.get('/api/ping', (req, res) => {
  res.status(200).json({ message: 'Pong 🏓' });
});

export default app;

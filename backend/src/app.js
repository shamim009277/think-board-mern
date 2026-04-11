import noteRouter from './routes/note.route.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import express from 'express';
import rateLimiter from './middlewire/rateLimiter.js';

import cors from 'cors';

dotenv.config();
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(rateLimiter);
app.use('/api/notes', noteRouter);

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

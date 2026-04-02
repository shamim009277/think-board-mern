import noteRouter from './routes/note.route.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
const app = express();

app.use('/api/notes', noteRouter);

connectDB();

app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

import noteRouter from './routes/note.route.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();
const app = express();

app.use(express.json());

app.use('/api/notes', noteRouter);

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

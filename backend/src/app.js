import express from 'express';
const app = express();

import noteRouter from './routes/note.route.js';

app.use('/api/notes', noteRouter);

app.use(express.json());

app.listen(5001, () => {
  console.log('Server is running on port 5001');
});
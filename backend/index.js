const express = require('express');
const app = express();


app.get('/api/notes/', (req, res) => {
  res.status(200).json({ message: 'get all notes' });
});

app.post('/api/notes/', (req, res) => {
  res.status(201).json({ message: 'create a new note successfully' });
});

app.get('/api/notes/:id', (req, res) => {
  res.status(200).json({ message: 'get a specific note' });
});

app.put('/api/notes/:id', (req, res) => {
    res.status(200).json({ message: 'update a specific note successfully' });
});

app.delete('/api/notes/:id', (req, res) => {
    res.status(200).json({ message: 'delete a specific note successfully' });
});


app.listen(5001, () => {
  console.log('Server is running on port 5001');
});
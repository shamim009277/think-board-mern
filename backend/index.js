const express = require('express');
const app = express();


app.get('/api/motes/', (req, res) => {
  res.status(200).json({ message: 'get all motes' });
});

app.post('/api/motes/', (req, res) => {
  res.status(201).json({ message: 'create a new mote successfully' });
});

app.get('/api/motes/:id', (req, res) => {
  res.status(200).json({ message: 'get a specific mote' });
});

app.put('/api/motes/:id', (req, res) => {
    res.status(200).json({ message: 'update a specific mote successfully' });
});

app.delete('/api/motes/:id', (req, res) => {
    res.status(200).json({ message: 'delete a specific mote successfully' });
});


app.listen(5001, () => {
  console.log('Server is running on port 5001');
});
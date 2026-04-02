const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!. This is the backend server. You can add your API routes here.');
})



app.listen(5001, () => {
  console.log('Server is running on port 5001');
});
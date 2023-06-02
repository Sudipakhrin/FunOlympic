const express = require('express');
const app = express();

app.use(express.json());
app.use('/static', express.static('static'));

app.post('/register', function(req, res) {
  console.log(req.body);
  res.send('Received your request!');
});

app.listen(3000, function() {
  console.log('Server is running on port 3000');
});

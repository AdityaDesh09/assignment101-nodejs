const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const port = 80;

// place holder for the data
const users = [
  {
    firstName: "first1",
    lastName: "last1",
    email: "first1.last1@gmail.com"
  },
  {
    firstName: "first2",
    lastName: "last2",
    email: "first2.last2@gmail.com"
  },
  {
    firstName: "first3",
    lastName: "last3",
    email: "first3.last3@gmail.com"
  }
];

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../my-app/build')));

// Enable CORS for specific origin
app.use(cors({
  origin: 'http://localhost:3000'
}));

// Simple GET API with /get path
app.get('/get', (req, res) => {
  res.json({ message: 'Hi Aditya, This message is from the server' });
});

app.get('/api/users', (req, res) => {
  console.log('GET /api/users called!');
  console.log('Returning Users:', users);
  res.json(users);
});

app.post('/api/user', (req, res) => {
  const user = req.body.user;
  console.log('POST /api/user - Adding user:', user);
  users.push(user);
  console.log('Updated Users:', users);
  res.json("user added");
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../my-app/build/index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});

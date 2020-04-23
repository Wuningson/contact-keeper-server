const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const db = require('./db/db');
const users = require('./routes/users');
const auth = require('./routes/auth');
const contacts = require('./routes/contacts');

// Connect database
db();
app.use(express.json({ extended: false }));
app.use(cors());
app.use(helmet());

app.use('/', users);
app.use('/', auth);
app.use('/', contacts);

app.get('/', (req, res) => {
  res.send(`Working fine`);
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));

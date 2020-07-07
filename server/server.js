const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const env = require('dotenv').config();

const userController = require('./controllers/user');
const verifyToken = require('./utils/verifyToken');

const app = express();
const PORT = process.env.PORT || 5000;

// ------
// Routes
// ------

app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
app.use(express.json({ extended: false }));
app.use(cookieParser());

app.post('/api/register', userController.registerUser);
app.post('/api/login', userController.loginUser);
app.get('/api/logout', userController.logoutUser);
// Used to check if the users token is valid
// Allows us to protect routes on the client side
app.get('/api/checkToken', [verifyToken], (req, res) => {
  res.status(200).send(res.locals.userId);
});

// Collection routes
app.use('/api/collections', require('./routes/api/collections'));
// User routes
app.use('/api/user', require('./routes/api/user'));

// Let React handle all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});

// -------------
// Connect to DB
// Then start server
// -----------------

mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
  });
});

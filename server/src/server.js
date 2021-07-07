const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const port = 5000;

const app = express();

app.get('/health', (req, res) => {
  res.status(200).json({ message: 'healthy' });
});

const mongoUrl = 'mongodb://localhost:27017/chord-changes';

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  console.log('Database connected');
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
});

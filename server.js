const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const router = require('./modules');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) throw err;
  console.log('MongoDB connected')
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => res.send({ success: 1 }));
// config rouer
router(app);

app.listen(process.env.PORT, (err) => {
  if (err) throw err;
  console.log('Server start succesfully')
})

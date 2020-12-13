const path = require('path');
process.env.NODE_CONFIG_DIR = path.join(__dirname,"config");

const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const todo = require('./routes/todo');
const config = require('config');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const functionName = config.get('functionName');
app.use('/api/todos', todo);

exports[functionName] = functions.https.onRequest(app);
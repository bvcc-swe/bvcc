const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const todo = require('./routes/todo')

const app = express();
const port = 3002;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/todos', todo);

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));

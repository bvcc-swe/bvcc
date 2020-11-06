const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3002;

// Where we will keep books
const items = [
    {
        "id": 1,
        "user": "john",
        "title": "Complete Taxes",
        "isComplete": false,
        "request": {
            "distance": 5,
            "duration": 30,
            "ask": 20.00
        }
    },
    {
        "id": 2,
        "user": "john",
        "title": "Take out trash.",
        "isComplete": false,
        "request": {
            "distance": 20,
            "duration": 60,
            "ask": 40.0
        }
    },
    {
        "id": 3,
        "user": "john",
        "title": "Mail in absentee ballot.",
        "isComplete": false,
        "request": null
    }];

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/todo', (req, res) => {
    const item = req.body;
    item.id = Math.max(...items.map(x => x.id)) + 1;
    items.push(item);
    res.json(item);
});

app.put('/api/todo/:id'), (req, res) => {
    const item = req.body;
    const index = items.findIndex(x => x.id === id);
    if (index < 0) {
        res.status(404).send("The item was not found.");
    }
    const result = {...items[index], ...item, id};
    items[index] = result;
    res.json(result);
}

app.get('/api/todo', (req, res) => {
    res.json(items);
});

app.get('/api/todo/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const result = items.find(x => x.id === id);
    if (!result) {
        res.status(404).send("The item was not found.");
    }
    res.json(result);
});

app.delete('/api/todo/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = items.findIndex(x => x.id === id);
    if (index < 0) {
        return;
    }
    items.splice(index, 1);
    res.status(200);
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));

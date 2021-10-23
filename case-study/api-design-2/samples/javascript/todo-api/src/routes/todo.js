const express = require('express');
const items = require('../data/items.json');

const router = express.Router();
function parseBoolean(value) {
    if (typeof (value) !== "string") {
        throw new Error("The value must be of type string.")
    }
    switch (value.toLowerCase()) {
        case "true":
            return true;
        case "false":
            return false;
        default:
            throw new Error("The value must be either 'true' or 'false'.")
    }
}

router.get('/', (req, res) => {
    const filterProperty = (prop, item, query, parse) => query[prop] !== undefined ? item[prop] === (parse ? parse(query[prop]) : query[prop]) : true;
    const filter = item => filterProperty("user", item, req.query) && filterProperty("isComplete", item, req.query, parseBoolean)
    const result = req.query ? items.filter(filter) : items;

    res.json(result);
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const result = items.find(x => x.id === id);
    if (!result) {
        res.status(404).send("The item was not found.");
    }
    res.json(result);
});

router.post('/', (req, res) => {
    const id = Math.max(...items.map(x => x.id)) + 1;
    const createdDate = new Date().toISOString();
    const item = { title: "", isComplete: false, request: null, ...req.body, id, createdDate };
    items.push(item);
    res.json(item);
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = req.body;
    const index = items.findIndex(x => x.id === id);
    if (index < 0) {
        res.status(404).send("The item was not found.");
    }
    const result = { ...items[index], ...item, id };
    items[index] = result;
    res.json(result);
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = items.findIndex(x => x.id === id);
    if (index < 0) {
        res.sendStatus(200);
    }
    items.splice(index, 1);
    res.sendStatus(200);
});

module.exports = router;
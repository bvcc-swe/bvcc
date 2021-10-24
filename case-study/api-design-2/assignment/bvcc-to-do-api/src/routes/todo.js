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

// Get the To-Do List Item with the Specified ID:
// - Create a route that supports the GET method for the URL, /api/todos/{id}.
// - If an item with the specified ID exists within the items collection, send the item to the client as JSON.
// - If the item does not exist in the collection, send the client an HTTP Status Code a 404.

// Create a To-Do List Item:
// - Create a route that supports POST method for the URL, /api/todos.
// - The new item should be read from the body of the request and converted to a JSON object.
//   The new item will automatically be converted to JSOn if the request specifies the Content-Type
//   header as application/json, and the request body content is a valid string representation of a 
//   JSON object. 
// - The new item should be assigned an id whose value is 1 greater the largest id for an item in the
//   existing collection.
// - Return the item containing the new id to client.

// Delete the To-Do List Item with the Specified ID:
// - Create a route that supports DELETE method for the URL, /api/todos/{id}.
// - If an item with the specified ID exists within the collection, remove it.
// - Return a HTTP status code, 200.

module.exports = router;
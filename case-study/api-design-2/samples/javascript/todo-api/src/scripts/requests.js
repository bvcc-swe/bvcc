// get all items
fetch("http://localhost:3002/api/todos").then(response => response.json()).then(items => console.log(items));

// get all items where the user is jane
fetch("http://localhost:3002/api/todos?user=jane").then(response => response.json()).then(item => console.log(item));

// get all items where the user is jane and isComplete is false
fetch("http://localhost:3002/api/todos?user=jane&isComplete=false").then(response => response.json()).then(item => console.log(item));

// get item with ID, 2.
fetch("http://localhost:3002/api/todos/2").then(response => response.json()).then(item => console.log(item));

// create item
fetch("http://localhost:3002/api/todos", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: "Cast ballot." }) }).then(response => response.json()).then(item => console.log(item));

// update item with ID, 2
fetch("http://localhost:3002/api/todos/2", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: "" }) }).then(response => response.json()).then(item => console.log(item));

// delete item with ID, 2
fetch("http://localhost:3002/api/todos/2", { method: "DELETE" }).then(response => fetch('http://localhost:3002/api/todos/2')).then(response => console.log(response.status));
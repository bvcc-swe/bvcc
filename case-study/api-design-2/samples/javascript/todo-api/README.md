# Getting Started
## Prerequisites
- Install [NodeJS](https://nodejs.org/en/download/)
- Run `$ npm install` in the terminal to install all dependencies
- [ExpressJS] (https://expressjs.com/en/4x/api.html), Body Parser, Cors
- Install [Visual Studio Code](https://code.visualstudio.com/download)
- Install [Postman](https://www.postman.com/downloads/)

## Assignment
This assignment focuses on acreating and utilizing APIs. We have already created the client for you. Which is a file that handles each call to the API everytime it the user does an action that calls for it. For example when a user presses the add button to add a todo to the list. The client will handle it and make the needed POST request to the API. 

Your task is to finish creating the API for the client to talk to. We have already completed getAll and put for you. You must complete the following in the todo.js file
1. Complete the code for the API action functions, getAll, Post, & Delete in the todo.js file
1. The GetAll function should return all the todos that are stored in our collection
1. The Post function should create a new todo based on a given id
1. The Delete function should delete a todo based on a gived id

## How to run React App
In order to have to test your api you must run the react app which holds the code to our client and api.
1. Run your React App by changing to the src folder and running the command `$ npm start`

## Running the API
API is hosted on your local server, you must run it seperately in order to interact with it
1. Open the folder, `bvcc\sessions\8\samples\javascript\todo-api\`, in Visual Studio Code.
1. Open a terminal (View &#8594; Terminal), and run `npm install` from the project root directory to install the project dependencies.
1. From the main menu, select Run &#8594; Start Debugging.  
**Note:** This command will host the API at http://localhost:3002.

## How to Test the API with Postman 
In order to test the API and make sure it running correctly you test it with postman with fake requests. Do the following
1. Open the Postman Application and sign in
1. Press the New+ Orange Button at the top left
1. Select what type of request to make (GET,PUT,POST,DELETE)
1. Put in the resource identifier for example for a get request we would use "http://localhost:3002/api/todo"
1. Press Send
**Note:** A Request on Postman will only work if you have both the react app and api running

## Sending Requests to the API
The REST API supports the requests listed in the table below. These requests can be sent sent to the API by: 
- Using Postman to construct and send requests.
- Executing the commands in the [src/scripts/requests.js](/src/scripts/requests.js) file in the web browser console.
- Entering the URI for GET requests in the web browser address bar. 

### Supported Requests
|Description|URI|Method|Headers|Body|
|-----------|----|-------|------|----|
| Get the collection of to-do list items.|http://localhost:3002/api/todos | GET | Content-Type: application/json | N/A |
| Get the collection of to-do list items where the user is `jane`.|http://localhost:3002/api/todos?user=jane | GET | Content-Type: application/json | N/A |
| Get the collection of to-do list items where the user is `jane` and isComplete is `true`. |http://localhost:3002/api/todos?user=jane&isComplete=false | GET | Content-Type: application/json | N/A |
| Get the to-do list item where the ID is `2`.|http://localhost:3002/api/todos/2 | GET | Content-Type: application/json | N/A |
| Create a new to-do list item. |http://localhost:3002/api/todos | POST | Content-Type: application/json | "{"title":"Complete mail-in ballot."}" |
| Change the title of the to-do list item where the ID is `2`.|http://localhost:3002/api/todos/2 | PUT | Content-Type: application/json | "{"title":"Confirm mail-in ballot was received."}" |
| Delete the to-do list item where the ID is `2`.|http://localhost:3002/api/todos/2 | DELETE | Content-Type: application/json | N/A |


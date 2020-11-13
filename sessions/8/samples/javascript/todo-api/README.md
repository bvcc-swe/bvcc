# Getting Started
## Prerequisites
- Install [NodeJS](https://nodejs.org/en/download/)
- Run `$ npm install` in the terminal to install all dependencies
- [ExpressJS] (https://expressjs.com/en/4x/api.html), Body Parser, Cors
- Install [Visual Studio Code](https://code.visualstudio.com/download)
- Install [Postman](https://www.postman.com/downloads/)

##To-do
1. You must complete the code for the API action functions, getAll, Put, & Delete in the .js file
1. Get All should return all the todos that are stored in our collection
1. Put should create a new todo based on a given id
1. Delete should delete a todo based on a gived id

## Running the API
1. Open the folder, `bvcc\sessions\8\samples\javascript\todo-api\`, in Visual Studio Code.
1. Open a terminal (View &#8594; Terminal), and run `npm install` from the project root directory to install the project dependencies.
1. From the main menu, select Run &#8594; Start Debugging.  
**Note:** This command will host the API at http://localhost:3002.

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

## How to run React App
1. Run your React App by changing to the src folder and running the command `$ npm start`

## How to Use Postman to Test API
1. Open the Postman Application and sign in
1. Press the New+ Orange Button at the top left
1. Select what type of request to make (GET,PUT,POST,DELETE)
1. Put in the resource identifier for example for a get request we would use "http://localhost:3002/api/todo"
1. Press Send

**Note:** A Request on Postman will only work if you have both the react app and api running

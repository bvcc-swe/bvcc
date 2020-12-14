# Part1: Getting Started With API Deployment
In order to allow the API to be accessed by clients over the internet, it must be deployed to a hosting service. A hosting service stores your application files, and makes them accessible on the internet via a URL. To host your API, you will deploy it Firebase's Functions service. The steps below will guide you through building and deploying your API.

## Prerequisites
1. Install [NodeJS](https://nodejs.org/en/download/)
1. Install [Java SE](https://www.oracle.com/java/technologies/javase-downloads.html)
1. Create a [Firebase](https://firebase.google.com) account.
1. Install the Firebase CLI (Command Line Interface)
    ```shell
    npm install -g firebase-tools
    ```

## Create the Firebase Function Project
To begin building your Firebase Function, you use the Firebase CLI to create a Firebase Function project. The project creates a folder structure and files based on certain conventions that will be used to build, test, and deploy the application. The steps below will guide you through creating and configuring the Firebase Function project.
1. Log in to Firebase.
    ```shell
    firebase login
    ```
1. Initiate the Firebase project.  
    ```
    firebase init functions
    ```
    1. Verify the folder name, then type `Yes` when prompted to proceed.
    1. When prompted to **Please select an option**, select `Use an existing project`.
    1. When prompted to select a default Firebase project, select `bvcc-swe`.
    1. When prompted to select a language, select `JavaScript`.
    1. When prompted to use ESLint, select `Yes`.
    1. When prompted to install dependencies with npm, select `Yes`.
1. Update the ESLint configuration by setting the `ecmaVersion` to `2018` in the `firebase/.eslintrc.json`
    ```json
        "parserOptions": {
            "ecmaVersion": 2018
        }
    ```
    >**Note:** Some of the features used in this project are not supported in versions of ECMAScript (the specification for JavaScript) earlier than 2018.

1. Replace the contents of `.\firebase.json` with the code below.
    ```json
    {
        "functions": {
            "predeploy": [
                "npm --prefix \"$RESOURCE_DIR\" run lint"
            ],
            "source": "functions"
        },
        "firestore": {
            "rules": "firestore.rules",
            "indexes": "firestore.indexes.json"
        }
    }
    ```
1. Create the following files:\
    `.\firestore.rules`
    ```
    rules_version = '2';
    service cloud.firestore {
    match /databases/{database}/documents {
        match /{document=**} {
            allow read, write: if
                request.time < timestamp.date(2020, 12, 19);
            }
        }
    }
    ```
    `.\firestore.indexes.json`
    ```json
    {
        "indexes": [],
        "fieldOverrides": []
    }
    ```
## Create the Express API
1. Add NodeJS dependencies for the Express API.  
    ```shell
    cd .\functions
    npm install express cors body-parse config js-yaml --save
    ```
    >The application code for a Firebase Function is contained in the `functions` directory. Therefore, the installation of Node packages should occur within the `functions` directory.

1. Replace the contents of `functions\index.js` with the code below.

    ```javascript
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
    ```

1. Create the followingn files:\
`.\functions\routes\todo.js`
    ```javascript
    const express = require('express');
    const config = require('config');
    const admin = require('firebase-admin');

    const router = express.Router();

    admin.initializeApp();
    const db = admin.firestore();
    const collectionPath = config.get('collectionPath');
    const collection = db.collection(collectionPath).withConverter({
        toFirestore(item) {
            return {title: "", isComplete: false, user: "unknown", request: null, ...item};
        },
        fromFirestore (snapshot, options) {
            const data = snapshot.data(options);
            return {id: snapshot.id, ...data};
        }
    });

    router.get('/', async (req, res) => {
        let query = collection;
        req.query || Object.keys(req.query).forEach(k => query = query.where(k, "==", req.query[k]));
        const snapshot = await query.get();
        res.json(snapshot.docs.map(s => s.data()));
    });

    router.get('/:id', async (req, res) => {
        const reference = collection.doc(req.params.id);
        const snapshot = await reference.get();
        if (!snapshot.exists) {
            res.status(404).send("The item was not found.");
        }
        res.json(snapshot.data());
    });

    router.post('/', async (req, res) => {
        const reference = await collection.add(req.body);
        const snapshot = await reference.get()
        res.json(snapshot.data());
    });

    router.put('/:id', async (req, res) => {
        const reference = collection.doc(req.params.id);
        await reference.set(req.body, {merge: true});
        const snapshot = await reference.get();
        res.json(snapshot.data());
    });

    router.delete('/:id', async (req, res) => {
        await collection.doc(req.params.id).delete();
        res.sendStatus(200);
    });

    module.exports = router;
    ```
    `.\firebase\config\default.yml`
    ```yaml
    functionName: <firstName><lastName>
    collectionPath: <firstName><lastName>
    ```

1. In the `default.yml` file, replace the `firstName` and `lastName` tokens with your first and last name. For example, if your if your name is `Barack Obama`, then the value should be `barakobama`.

## Run the Firebase Function Locally
Firebase provides emulators that enable local testing of Firebase Functions. This feature allows developers to validate the functionality of the Firebase Function without incurring cloud costs. The steps below provide instructions on how to validate the Firebase Function using emulated Firebase services.

1. Start the firebase emulators.
    ```
    firebase emulators:start
    ```
1. Execute the HTTP requests described in the table below to confirm that the API is functioning properly. Your API is hosted at `http://localhost:5001/bvcc-swe/us-central1/<firstName><lastName>`.
    >**Tip:** Use [Postman](https://www.postman.com/) or [curl](https://curl.se/) to initiate HTTP requests.

    >**Tip:** The function is hosted at `http://localhost:5001/bvcc-swe/us-central1/<firstName><lastName>`. This URL should precede each path listed in the table. For example, the URL for a `GET` request should be `http://localhost:5001/bvcc-swe/us-central1/<firstName><lastName>/api/todos`.
    
    >**Tip:** Initiate a `POST` request first so that data will be available for subsequent requests.  

    >**Tip:** To view the data stored by the API, visit http://localhost:4000/firestore.
    
    | Path | HTTP Method | Body | Headers| Description |
    |---|---|---|---|---|
    |/api/todos| GET | N/A | Content-Type: application/json | Gets all to-do list items.|
    |/api/todos/{id}| GET | N/A | Content-Type: application/json |Gets the to-do list item with the specified ID.|
    |/api/todos| POST | {"title": "Take out the trash", "user":"barak"} | Content-Type: application/json |Creates a to-do list item. |
    |/api/todos/{id} | PUT | {"isComplete": true } | Content-Type: application/json | Updates the to-do list item with the specified ID.|
    |/api/todos/{id} | DELETE | N/A | Content-Type: application/json |Delete the to-do list item with the specified ID.| 

## Deploy the Firebase Function
To make the API available over the internet, the Firebase Function must be deployed to the Firebase Cloud Platform.
The steps below provide instructions on how to deploy the Firebase Function to the cloud.

1. Deploy the Firebase Function.
    ```shell
    firebase deploy --only functions,hosting
    ```
1. When prompted to delete functions that are not in your local source code, type `N`.
1. Confirm that the deployment completed successfully.

## Validate the Deployment
1. Execute the HTTP requests described in the table below to confirm that the API is functioning properly. Your API is hosted at `https://us-central1-bvcc-swe.cloudfunctions.net/<firstName><lastName>`.
    >**Tip:** Use [Postman](https://www.postman.com/) or [curl](https://curl.se/) to initiate HTTP requests.

    >**Tip:** The function is hosted at `http://localhost:5001/bvcc-swe/us-central1/<firstName><lastName>`. This URL should precede each path listed in the table. For example, the URL for a `GET` request should be `http://localhost:5001/bvcc-swe/us-central1/<firstName><lastName>/api/todos`.
    
    >**Tip:** Initiate a `POST` request first so that data will be available for subsequent requests.

    >**Tip:** to view the data stored by the API, visit https://console.firebase.google.com/project/bvcc-swe/firestore.  

    | Path | HTTP Method | Body | Headers| Description |
    |---|---|---|---|---|
    |/api/todos| GET | N/A | Content-Type: application/json | Gets all to-do list items.|
    |/api/todos/{id}| GET | N/A | Content-Type: application/json |Gets the to-do list item with the specified ID.|
    |/api/todos| POST | {"title": "Take out the trash", "user":"barak"} | Content-Type: application/json |Creates a to-do list item. |
    |/api/todos/{id} | PUT | {"isComplete": true } | Content-Type: application/json | Updates the to-do list item with the specified ID.|
    |/api/todos/{id} | DELETE | N/A | Content-Type: application/json |Delete the to-do list item with the specified ID.| 
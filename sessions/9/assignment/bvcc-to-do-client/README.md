# Part 2: Getting Started With Deployment
In order to make the client application available on the internet, it must be deployed to a hosting service. A hosting service stores your application files, and makes them accessible on the internet via a  URL. To host your client application, you will deploy it Firebase's Hosting service. The steps below will guide you through building and deploying your client.

## Create a Firebase Site
Before you deploy your application to Firebase, you must create a site using the Firebase Hosting service. The site defines a storage location, and your application's URL. The steps below will guide you through creating a site.

1. Go to https://firebase.google.com and press 'Go to Console' in the top right ![console](./images/gtoconsole.png)
1. Login and go to the `bvcc-swe project`.
1. Navigate to the hosting section on the left side
1. You should see this at top of the page ![Hosting](./images/hostingheader.png)
1. Press 'Add another site'
1. Name your site in the format `bvcc-to-do-{firstname}{lastname}.web.app` ![Hosting](./images/addsite.png)

Verify that you see your new hosting site in the list 

#
## Configure Firebase Project
 1. Install Firebase Tools 
    ```
    $ npm install -g firebase-tools
    ```
2. Initialize Firebase Hosting
    ```
    $ firebase init hosting
    ```
#
## Project Set up
1. Select `Use an existing project` with Enter
1. Select `bvcc-swe (bvcc-swe)` with Enter
1. What do you want to use as your public directory? `build` 
1. Create a single-page app (rewrite all urls to /index.html)? `Y`
1. Set up automatic builds and deploys with Github? `N`

Firebase Initialization complete!

## Update the Application Configuration
1. Go to the `.\.env` file 
1. Replace the value of the `REACT_APP_API_HOST` withe URL of the API you deployed in [Part 1](../bvcc-to-do-api/README.md) of this assignment.
    ```
    REACT_APP_API_HOST=https://us-central1-bvcc-swe.cloudfunctions.net/{firstname}{lastname}
    ```
#
## Build the Client (React App)
In order to host our client onto the internet we must create a production build. 

1. Go to `.\sessions\9\assignment\bvcc-to-do-client` 
1. Run the build command 
    ```
    $ npm run build
    ``` 
Once that is complete the client is ready for hosting!

#
## Deploy your the Client
1. Run the firebase deploy only hosting command
    ```
    $ firebase deploy --only hosting
    ```

#
## Validate Deployment
1. Go to `https://bvcc-to-do-{firstname}-{lastname}.web.app`.
1. Use the client to create two to-do list items. 
1. Refresh the page, and verify that the to-do list items are displayed.
1. Go to the [Cloud Firestore](https://console.firebase.google.com/project/bvcc-swe/firestore) tab on firebase.

Go to the collection that has your name, and verify that the two to-do list items that you created have been added to the database.

1. Delete one of the to-do list items that you created using hte client. 
1. Verify that is has been deleted from the database
 
 
 
 
 
 
 

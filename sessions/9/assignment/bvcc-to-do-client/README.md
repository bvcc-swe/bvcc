# Part 2: Getting Started With Deployment

In order to make the client application available on the internet, it must be deployed to a hosting service. A hosting service stores your application files, and makes them accessible on the internet via a  URL. To host your client application, you will deploy it through Firebase's Hosting service. The steps below will guide you through building and deploying your client.

## Prerequisites
> **Note:** The instructions are based on specific versions of the applications below. If you opt to use other versions of these applications, the instructions may not be applicable in some cases. 
1. Install [NodeJS](https://nodejs.org/en/download/) 12.x.x
1. Install [Java SE](https://www.oracle.com/java/technologies/javase-downloads.html) 15.x.x
1. Create a [Firebase](https://firebase.google.com) account.
1. Install the Firebase CLI (Command Line Interface) 9.x.x
    ```shell
    npm install -g firebase-tools@9
    ```

## Create a Firebase Site
Before you deploy your application to Firebase, you must create a site using the Firebase Hosting service. The site defines a storage location, and your application's URL. The steps below will guide you through creating a site.

1. Go to https://firebase.google.com and press 'Go to Console' in the top right ![console](./images/gtoconsole.png)
1. Log in and go to the `bvcc-swe project`.
1. Navigate to the hosting section on the left side.
1. You should see this at top of the page ![Hosting](./images/hostingheader.png)
1. Press 'Add another site'.
1. Name your site in the format `bvcc-to-do-{firstname}{lastname}.web.app` ![Hosting](./images/addHostingSite.png).
1. Verify that you see your new hosting site in the list.


#
## Update the Application Configuration
1. Open the file, [bvcc\sessions\9\assignment\bvcc-to-do-client\\.env](.env). 
1. Replace the value of the `REACT_APP_API_HOST` with the URL of the API you deployed in [Part 1](../bvcc-to-do-api/README.md) of this assignment.
    ```
    REACT_APP_API_HOST=https://us-central1-bvcc-swe.cloudfunctions.net/{firstname}{lastname}
 
## Configure Firebase Project
1. Open a command prompt window.
1. Change the working directory to `bvcc/sessions/9/assignment/bvcc-to-do-client`. 
1. Initialize Firebase Hosting project.
    ```
    $ firebase init hosting
    ```
    1. Select `Use an existing project` (with spacebar) and then hit enter to submit
    1. Select `bvcc-swe (bvcc-swe)` 
    1. What do you want to use as your public directory? `build` 
    1. Create a single-page app (rewrite all urls to /index.html)? `Y`
    1. Set up automatic builds and deploys with Github? `N`
3. Specify the site name by assigning the value, `bvcc-to-do-{firstname}{lastname}`, to the `hosting.site` property in the `bvcc/sessions/9/assignment/bvcc-to-do-client/firebase.json` file.

    ```
    {
        "hosting": {
            ...
            "site": "bvcc-to-do-tabiacannon"
            ...
        }
    }

    ``` 
>**Note:** The value of `hosting.site` should follow the format, `bvcc-to-do-{firstname}{lastname}`. For example, if your name is Tabia Cannon, then the value of `hosting.site` should be `bvcc-to-do-tabiacannon`. 

The firebase hosting has a default url (bvcc-swe.web.app) that was created when the project was created. It is multiple students working on this project. Therefore each student needs a unique hosting url. When we add this specific line, we are telling firebase to host our client at this specific url instead of the default one.  



## Build the Client (React App)
In order to deploy your client to Firebase, we must create a production build. 

1. Open a command prompt window.
1. Change the working directory to `bvcc/sessions/9/assignment/bvcc-to-do-client`.
1. Install the project dependencies.
    ```
    $ npm install
    ```
1. Build the client application.
    ```
    $ npm run build
    ``` 

## Deploy the Client

1. Deploy the client to Firebase.
    ```
    $ firebase deploy --only hosting
    ```

## Validate the Deployment
1. Go to `https://bvcc-to-do-{firstname}-{lastname}.web.app`.
1. Use the client to create two to-do list items. 
1. Refresh the page, and verify that the to-do list items are displayed.
1. Go to the [Cloud Firestore](https://console.firebase.google.com/project/bvcc-swe/firestore) tab on Firebase.
1. Go to the collection that has your name, and verify that the two to-do list items that you created have been added to the database.
1. Delete one of the to-do list items that you created using the client. 
1. Return to the client application, and verify that the item is no longer displayed.
 
 
 
 
 
 
 

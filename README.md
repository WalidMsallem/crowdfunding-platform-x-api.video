## POC Crowdfunding platform with api.video
link : https://api.video/

## Quick start

1.  Make sure that you have Node.js and yarn installed.
2. To ensure that the demo runs smoothly, please install the browser extension: Cross Domain - CORS.
here the link: https://chrome.google.com/webstore/detail/cross-domain-cors/mjhpgnbimicffchbodmgfnemoghjakai
2.  Clone this repo using `git clone git@github.com:WalidMsallem/crowdfunding-platform-x-api.video.git` 
3.  Move to the appropriate directory: `cd crowdfunding-platform-x-api.video`.
 
4.  Run `yarn` in order to install all dependencies. 
````
$ yarn
````
5.  Run `yarn start`.
````
$ yarn start
````
 
 _At this point the frontend will run under `http://localhost:4000`._
 
Now you're ready to rumble!

## Contributor
Developpeur : Walid M'sallem ( Full stack developpeur ) 
Contact : walidmsallem@gmail.com 

## Features

This frontend manages application state using **Redux**, makes it
immutable with  **Immer* and keeps access performant  **reselect**.
For managing asynchronous flows (e.g. logging in) we use **redux-saga**.
.**Antd** and **@emotion/styled** as a design system, 

## POC functionality 

Thanks to REACT_APP_VIDEOS_API_KEY, the application can create a token access and then create or list uploader tokens,
the user is now able to create a project (crowdfunding) where it is necessary to fill a form with details and then upload an explanatory video thanks to delegated upload token.
On the other hand, users can list all the projects and open each one separately to view the video of the selected project.
You can create your API Keys on your dashboard https://dashboard.api.video/apikeys and modify it under the .env file

## Plan feature

1. Create a backend project (probably with node js) to manage project entities, storage, business logic, CRUDs, auth and other controls
2. Create PSD mock-ups for the old and new pages of the platform, we mainly find authentication screens and a dashboard where the user tracks his projects that he has created, modify them, delete consult the money paid to his projects , and he can also track his payments that he made for other projects.
3. Integrate a secure average of receipt and payment of money by collaborating with the backend
4. Add status for each project so that visitors can track the progress of the project
5. Add direct interaction means between users, such as a project commenting system with private messaging.




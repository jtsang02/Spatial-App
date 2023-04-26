# Spatial-App Proposal / Outline

## Description

<p>The full-stack spatial web app (referred to as the Spatial Web App) will be the next iteration of the current Excel based spatial separation table used internally by GHL tech staff.  The purpose of this app will be to provide an improved user experience compared to the existing spatial separation table, as well as provide a platform for future expansion into a deployable software as a service (SaaS) product.</p>

<p>The current Excel based spatial table does not have full create, read, update and delete (CRUD) functionality, and is not a user intuitive design. Users currently need to have a high level of technical knowledge to use the spatial table.  The table is not easily accessible to those without sound knowledge of Excel, in addition to extensive training on how to use the spreadsheet.  Inserting a new compartment calculation is not possible without unhiding rows and shifting down cells, making organizing the table difficult.  Deleting a row removes a 'link' to the interpolations table, which is not ideal.  Excel in general is ok for basic math calculations, but is not an ideal platform for dynamic add/delete operations that require CRUD operations.</p>

## Features

<p>The Spatial Web App will have full CRUD functionality giving users the ability to add, remove, and update compartment calculations with ease as a web application platform.</p>

<p>The app will be browser based and built using the MERN stack (MongoDB, Express, React, Node.js). The app will be built with a web first approach, and will incorporate responsive web design to accomodate different screen sizes including mobile.</p>

<p>For the internal-use version of the Spatial Web App, the app will be hosted on a private server and will be accessible to GHL staff only.  The app will be accessible via a web browser, and will be accessible from any device with a web browser and internet connection.</p>

<p>Users will import and save compartment calculations to the app by opening a .csv file as described in further sections below, and will be able to view, edit, and delete calculations.  A print feature will output the table of compartment calculations in a PDF format, in a similar way that Excel exports a spreadsheet in PDF format. The app will have a user friendly interface that will be intuitive to use, and will be designed for those with little to no technical knowledge.</p>

## Design

<p>The app will be built with a modular design, allowing for future expansion into a SaaS product.</p>

### Frontend

<p>The frontend will be built using React and TypeScript, and will be a single page application (SPA).  The frontend will be built with a modular design, allowing for future expansion into a SaaS product.  The frontend will be built with a web first approach, and will incorporate responsive web design to accomodate different screen sizes including mobile.</p>

### Algorithm

<p>The method used to calculate spatial separation will be the same as the current Excel based spatial table by looking up the applicable Building Code tables and bi-linearly interpolating values.  The 

[javascript code](https://github.com/jtsang02/spatial-calc-js/blob/main/src/compartment.js) developed two summers ago and shared with JDM will serve as a base.  This code will be rewritten in TypeScript for best design practices, and modified to work with the MERN stack.</p>

### Database and Storage

<p>It is understood that GHL strictly follows OQM file management standards, and the current spatial table is stored in file explorer on the projects drive on a per project basis.  For the internally used version of the app, the database will remain as the current file explorer structure with a .csv file for each project.  The .csv file will be read into the app and stored in memory as a JSON object.  The JSON object will be used to populate the table, and will be used to perform CRUD operations.  The JSON object will be written back to the .csv file when the user saves the table.</p> 

<p>For the future SaaS version of the app, the database will be migrated to a cloud based database service such as MongoDB Atlas.</p> 

### Testing

Unit testing will be performed using a testing framework such as Jest to ensure the code is working as expected.  Integration testing will be performed to ensure the frontend and backend are working together as expected.  End to end testing will be performed to ensure the app is working as expected from a user perspective.

## Technologies Used

The tech stack will consist of the following technologies:

- [React](https://reactjs.org/)
- [mongoDB](https://www.mongodb.com/)
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)

## Timeline and Milestones


## Time Spent


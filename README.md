# Spatial Calculator API

The Spatial Web App offers comprehensive CRUD functionality, empowering users to effortlessly manage compartment calculations within a browser-based platform. Developed using the MERN stack (MongoDB, Express, React, Node.js), the app prioritizes a web-first approach and integrates responsive design to cater to various screen sizes, including mobile devices.

Folders
=================

The project is divided into three main folders:

- [Frontend](spatial-client/README.md)
- [Backend](api)
- [Testing](test/README.md)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:

- Node.js
- npm

### Installing

A step by step series of examples that tell you how to get a development environment running:

1. Clone the repo

```git clone https://github.com/your_username_/Project-Name.git```

2. Install NPM packages

```npm install```

## Running the server

In the project directory, you can run:

```npm start```

This runs the app in the development mode. Open [http://localhost:9000](http://localhost:9000) to view it in the browser.

## Using the API

The API is (or occasionally will be) hosted on an AWS EC2 instance. The base URL is:
    
```http://ec2-3-134-88-136.us-east-2.compute.amazonaws.com:3000/```

Here are some example API calls:

- POST a calculation: `POST /calculate`

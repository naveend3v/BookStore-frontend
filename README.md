## Overview

Readerhub is an online book store, where user can buy books. The owner of the store can add / delete / update books from online administrator webpage. This Backend of this project is build with Java SpringBoot framework with MySQL database and Front-end was build with Html, CSS(Bootstrap), ReactJs.

## Features
- JWT Based Authentication to access resources
- Storing books cover image to S3 bucket
- Payment Gateway Integration with Stripe
- Form Validation in Front-end and Back-end
- Back-end deployment with Docker
- Sample data initialization into MySQL DB using SQL scripts
- DataBase Relational data Handling with many-to-many relation
- Exception Handling with try and catch

## Prerequisites
- [Download and install npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## Usage
- Clone this repo
  
  `git clone https://github.com/naveend3v/readerhub-frontend.git`

- Configure, the `baseURL` and `origin` parameters in the file 
`./src/components/api/ApiClient.js`
- Open vscode / terminal in project root folder and install dependencies using command
 
    `npm install`

- To run the application execute the below command 

    `npm start build`

    then check the browser the application will run on url `http://localhost:3000`


## Back-end code
- Github repo - https://github.com/naveend3v/readerhub-backend
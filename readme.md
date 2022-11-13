# Overview 
 This project is all about managing tasks and assigning them to users. 

Only admins can assign tasks to users. the first account created in the database will automaticaly have an admin access and any other account will have a normal user access. 

Admins can edit any user and can provide admin access to them. Once a task is assigned to a user, it will be displayed to him. He can close the task when ever he finishes it. 

# Launch the project
## backend
To launch the project, you have to first add a `.env` file in the root directory that will hold the environment variables of the backend. You can find a `.env.example` folder as reference for the environment variables used.

After adding a `.env` file you have to install the NodeJS packages on the backend (the project holds both the frontend under the client folder and the backend in the root directory of the project)

To install the backend Node packages simply run:
``` bash
npm install
```
To run the backend server run:
``` bash
npm start
```
To run the backend server in development mode run:
``` bash
npm start:dev
```
Note that the server will listen on port `5000`
## frontend
Navigate to the client folder by running:
``` bash
cd client
```
Then to install the frontend packages run:
``` bash
npm install
```
Now you are ready to start the frontend by running:
``` bash
npm start
```
Note that the frontend will be accessible on port `4200`

# Features / Technologies 
 The core feature of this application , is to manipulate data, and treat each type of user differently. An admin can edit his own profile and edit any other user profile and also assigning tasks to users. Those tasks can be edited by the admin , he can delete the task or update the content and/or the title and  opening/closing it
The main goal of this application is to build a full CRUD application that uses NestJs in the back-end   
Platform & Libraries 
## Front-end
### Screens:
#### Signup screen
![signup_screen](https://amirplatform.s3.eu-central-1.amazonaws.com/project/tzvia7mnaqwusrc2fg6u.png)
#### Login screen
![login_screen](https://amirplatform.s3.eu-central-1.amazonaws.com/project/ujdagcdra8ohsk9dpicj.png)
#### Main page (regular user)
![main_page](https://amirplatform.s3.eu-central-1.amazonaws.com/project/dggkyksjs6ej6ifzwzkr.png)
#### Profile settings page 
![profile](https://amirplatform.s3.eu-central-1.amazonaws.com/project/ivnv88piol5gkvkmwz6d.png)
#### Main page (admin user)
![main_page](https://amirplatform.s3.eu-central-1.amazonaws.com/project/d2efx26zr3qrbl8h61qr.png)
### Dependencies 
```json
    "dependencies": {
        "@angular/animations": "~8.2.14",
        "@angular/common": "~8.2.14",
        "@angular/compiler": "~8.2.14",
        "@angular/core": "~8.2.14",
        "@angular/forms": "~8.2.14",
        "@angular/platform-browser": "~8.2.14",
        "@angular/platform-browser-dynamic": "~8.2.14",
        "@angular/router": "~8.2.14",
        "moment": "^2.27.0",
        "rxjs": "~6.4.0",
        "sweetalert2": "^9.15.2",
        "tslib": "^1.10.0",
        "zone.js": "~0.9.1"
    }
```

#### Angular (@angular):

those packages are imported directly using angular CLI when you start a new project to work with angular.
Link: [https://cli.angular.io/](https://cli.angular.io/)

#### moment
this library allow you to deal with date more efficiently and from it you can create dynamic dates like from-now date (1 min ago, 1 hour ago, etc..)
Link: [https://www.npmjs.com/package/moment](https://www.npmjs.com/package/moment)

#### rxjs:
this amazing and huge library has a lot to say about , but to be brief it allow you to manage some state in your angular project.
Link: [https://www.npmjs.com/package/rxjs](https://www.npmjs.com/package/rxjs)

#### sweetalert2:
this library provides a pre-build modals that you can use to display success messages or errors, without adding HTML or CSS to your project.
Link: [https://www.npmjs.com/package/sweetalert2](https://www.npmjs.com/package/sweetalert2)


## Backend
```json
  "dependencies": {
    "@nestjs/common": "^7.0.0",
    "@nestjs/config": "^0.5.0",
    "@nestjs/core": "^7.0.0",
    "@nestjs/jwt": "^7.0.0",
    "@nestjs/mongoose": "^7.0.1",
    "@nestjs/passport": "^7.1.0",
    "@nestjs/platform-express": "^7.0.0",
    "@types/bcrypt": "^3.0.0",
    "bcrypt": "^5.0.0",
    "helmet": "^3.23.3",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^5.9.21",
    "passport": "^0.4.1",
    "passport-jwt": "^4.0.0",
    "passport-local": "^1.0.0",
  }
```

### NestJs (@nestjs): 
@nestjs packages are imported automatically once you start a project with nestjs CLI
Link: [https://docs.nestjs.com/cli/usages](https://docs.nestjs.com/cli/usages)

### bcrypt:
Is a small library, that provides a secure hashing method that you can use to hash plain text passwords before storing them into the database, also it provides a method that compares the hashed passwords and an entered password (plain text) 
you can use this functionality in login handler.
Link: [https://www.npmjs.com/package/bcrypt](https://www.npmjs.com/package/bcrypt)

### jsonwebtoken:
Is a library responsible to manage tokens, it generates tokens from a payload you add, and you can make user authentication
with it, also you can protect some routes using a middleware that checks the token, you can add more options to it like the expiration time, etc... check out the docs below
Link: [https://www.npmjs.com/package/jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
 
### Helmet:
This library protect your express/nestjs back end applications from multiple threads
Link:[https://www.npmjs.com/package/helmet](https://www.npmjs.com/package/helmet)

### passport/ passport-local / passport-jwt:
all of those libraries serve to extract the token from the header and protect some routes from being access by non-authenticated users 
# What I learned ?
 My goal with this application is to train my self with nestjs which is a new framework for me specially using typescript and other features like decorators and accessors. Its a small CRUD application which allowed me to learn this amazing framework of ExpressJs and get interested in it , and i have started the same project with the same frond end using NestJs but with GraphQL this time i will post this project right after this one.
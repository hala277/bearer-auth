'use strict';

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const {User} = require('./auth/models/index.js');
const basicAuth = require('./auth/middleware/basic');
const bearerAuth = require('./auth/middleware/bearer');
const errorHandler = require('./middleware/500.js');
const errorHandler2 = require('./middleware/404.js');
// const UserModel = require('./auth/models/users-model.js');




const app = express();

app.use(express.json());
app.use(cors());

// route
app.get('/',(request,response) => {
    response.send('home route')
})

app.post('/signup',signupFunc);
app.post('/signin',basicAuth(User),signinFunc);
app.get('/user',bearerAuth(User),userHandler);


// signup Function
// localhost:3000/signup >> body{username:'hala',password:'123456'}
async function signupFunc(request,response){
    let {username, password} = request.body;
    console.log(`username: ${username} and password: ${password}`);

    try{
        let hashedPassword = await bcrypt.hash(password, 5);
        console.log('after hashing -->',hashedPassword);

        const newUser = await User.create({
            username: username,
            password: hashedPassword
        });
        response.status(201).json(newUser);
    }
    catch (error){
        console.log(error);
    }
}

function signinFunc(request,response){
    response.status(200).json(request.user);
}

function userHandler(request,response) {
    // send the user information to the client & create new repo
    response.status(200).json(request.user);

}

// 500 rout handler
app.use(errorHandler);

// 404 rout handler
app.use(errorHandler2); 

function start(port){
    app.listen(port,()=>{
console.log(`running on port ${port}`)
    })
}

module.exports = {
    app: app,
    start: start
}
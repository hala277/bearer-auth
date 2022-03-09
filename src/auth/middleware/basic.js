'use strict';

const bcrypt = require('bcrypt');
const base64 = require('base-64');
// const User = require('../models/users-model.js');





module.exports = (User) => async(request,response,next) => {
    if(request.headers['authorization']) {
        let basicHeaderParts= request.headers.authorization.split(' ');
        console.log('basicHeaderParts >>> ',basicHeaderParts);
        let encodedPart = basicHeaderParts.pop(); //encoded(username:password)
        console.log('encodedPart >>> ',encodedPart);
        let decoded = base64.decode(encodedPart); //username:password
        console.log('decoded >>> ',decoded);
        let [username,password]= decoded.split(':'); //[username: password]
        

        User.authenticateBasic(username,password).then(validUser=>{
            request.user = validUser;
            next();
        }).catch(error=>next(`invalid user ${error}`));
    }
}
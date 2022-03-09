'use strict';






module.exports =  (User) => async(request,response,next) => {
    if(request.headers['authorization']) {
        // 'Bearer token'
        let bearerHeaderParts= request.headers.authorization.split(' ');
        console.log('bearerHeaderParts >>> ',bearerHeaderParts); // ['Bearer','token']
        let token = bearerHeaderParts.pop(); //encoded(username:password)
        console.log('Token >>> ',token);
       
        User.validateToken(token).then(user=>{
            request.user = user;
            next();
        }).catch(error=>next(`invalid user ${error}`));
    }
}
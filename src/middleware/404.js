'use strict';

// const { request, response } = require("express");

module.exports = (error,request,response,next) => {
    response.status(404).send({
        code: 404,
        message:'Not-Found message'
    })
}
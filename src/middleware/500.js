'use strict';

// const { request, response } = require("express");

module.exports = (error,request,response,next) => {
    response.status(500).send({
        code: 500,
        message:'Server Error message'
    })
}
'use strict';
// define dotenv
require('dotenv').config();


// const { Sequelize } = require('sequelize/types');
const server = require('./src/server.js');
const {db} = require('./src/auth/models/index.js');
// const res = require('express/lib/response');

db.sync().then(() => {
    server.start(process.env.PORT || 3001)
})

.catch(console.error)
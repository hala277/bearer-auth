'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const User = require('./users-model');
const POSTGRES_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;

let sequelizeOptions = process.env.NODE_ENV === 'production' ? {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,

        },
        
    }
} : {};

let sequelize = new Sequelize(POSTGRES_URL, sequelizeOptions);

// let userModel = User(sequelize,DataTypes);
const UserModel = User(sequelize, DataTypes);

module.exports = {
    db: sequelize,
    User: UserModel
}
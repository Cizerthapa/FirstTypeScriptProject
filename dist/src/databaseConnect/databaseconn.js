"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv = require("dotenv");
const user_model_1 = require("../models/user.model");
dotenv.config(); // Load environment variables from .env file
// Set up Sequelize instance
const sequelize = new sequelize_typescript_1.Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'root',
    database: process.env.databasename,
    models: [user_model_1.default], // Register your models here
});
// Test the database connection
sequelize.authenticate()
    .then(() => {
    console.log('Connected to PostgreSQL using Sequelize');
})
    .catch((err) => {
    console.error('Connection Error', err);
    process.exit(1);
});
exports.default = sequelize;

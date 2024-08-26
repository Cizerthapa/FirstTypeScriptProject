import { Sequelize } from 'sequelize-typescript';
import * as dotenv from 'dotenv';
import person from '../models/user.model';

dotenv.config(); // Load environment variables from .env file

// Set up Sequelize instance
const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'root',
    database: process.env.databasename,
    models: [person], // Register your models here
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

export default sequelize;
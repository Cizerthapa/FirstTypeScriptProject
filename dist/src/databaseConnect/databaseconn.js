"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/databaseConnect/databaseconn
const pg = require("pg");
const client = new pg.Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'root',
    database: 'postgres'
});
client.connect((err) => {
    if (err) {
        console.error('Connection Error', err);
        process.exit(1);
    }
    console.log('Connected to postgres');
});
exports.default = client;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const pg = require("pg");
const app = express();
const PORTEX = 3000;
const client = new pg.Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'root',
    database: 'postgres'
});
// mongoose connection
client.connect((err) => {
    if (err) {
        console.error('Connection Error', err);
        process.exit(1);
    }
    console.log('Connected to postgres');
});
// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//routes(app);
// serving static files
app.use(express.static('public'));
app.get('/', (req, res) => res.send(`Node and express server is running on port ${PORTEX}`));
app.listen(PORTEX, () => console.log(`your server is running on port ${PORTEX}`));

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const databaseconn_1 = require("./src/databaseConnect/databaseconn"); // Import the client
const app = express();
const PORTEX = 3000;
// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// serving static files
app.use(express.static('public'));
// Define your routes
app.get('/', (req, res) => res.send(`Node and express server is running on port ${PORTEX}`));
// Example route that uses the database client
app.get('/data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield databaseconn_1.default.query('SELECT * FROM users');
        res.json(result.rows);
    }
    catch (err) {
        console.error('Query Error', err);
        res.status(500).send('Internal Server Error');
    }
}));
app.post('/data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let username = req.body.username;
        let password = req.body.password;
        let role = req.body.role;
        let fullname = req.body.fullname;
        if (!username) {
            return res.status(400).send('username is required');
        }
        if (!password) {
            return res.status(400).send('password is required');
        }
        if (fullname.length < 2) {
            return res.status(400).send('fullname must be grater than 2 letters');
        }
        // Check if the username already exists
        const checkQuery = `SELECT * FROM users WHERE username = $1`;
        const checkResult = yield databaseconn_1.default.query(checkQuery, [username]);
        if (checkResult.rows.length > 0) {
            return res.status(400).send('Username already exists. Please choose a different one.');
        }
        if (role == 'a' || role == 'u') {
            const query = `INSERT INTO users (username, password, role, fullname) VALUES ($1, $2, $3, $4) RETURNING *`;
            const values = [username, password, role, fullname];
            const result = yield databaseconn_1.default.query(query, values);
            return res.status(200).send("OK!" + result);
        }
        else {
            return res.status(400).send('role is required in "u" for user or "a" for admin');
        }
    }
    catch (err) {
        console.error('Query Error', err);
        res.status(500).send('Internal Server Error');
    }
}));
app.delete('/data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.username;
        // Check if the username already exists
        const checkQuery = `SELECT * FROM users WHERE username = $1`;
        const checkResult = yield databaseconn_1.default.query(checkQuery, [username]);
        if (checkResult.rows.length > 0) {
            const query = `DELETE FROM users WHERE username = ($1) RETURNING *`;
            const result = yield databaseconn_1.default.query(query, [username]);
            res.json(result.rows[0]);
            return res.status(200).send("OK!");
        }
        else {
            return res.status(400).send('No user found');
        }
    }
    catch (err) {
        console.error('Query Error', err);
        res.status(500).send('Internal Server Error');
    }
}));
app.listen(PORTEX, () => console.log(`your server is running on port ${PORTEX}`));

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
app.listen(PORTEX, () => console.log(`your server is running on port ${PORTEX}`));

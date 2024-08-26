// tspractice/index.ts
import * as express from 'express';
import * as bodyParser from 'body-parser';
import client  from './src/databaseConnect/databaseconn';
import * as  bcrypt from 'bcrypt';
import * as  dotenv from 'dotenv';
import * as  jwt from 'jsonwebtoken';
import person from './src/models/user.model';
import sequelize from './src/databaseConnect/databaseconn'; 

// Ensure all models are initialized with Sequelize
sequelize.sync() // This ensures all models are synced with the database
    .then(() => {
        console.log('All models were synchronized successfully.');
    })
    .catch((err) => {
        console.error('Error synchronizing models', err);
    });

dotenv.config();

const app = express();
const PORTEX: number = 3000;

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serving static files
app.use(express.static('public'));

// Define your routes
app.get('/', (req, res) =>
    res.send(`Node and express server is running on port ${PORTEX}`)
);

// Example route that uses the database client
app.get('/data', async (req, res) => {
    try {
        // Fetch all records from the 'Person' table
        

        // Send the records as a JSON response
        //res.json(people);
    } catch (err) {
        console.error('Query Error', err);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/login', async (req, res) => {
    let username: string = req.body.username;
    try {
        const query = `SELECT * FROM users WHERE username = ($1)`;
        const values = [username];

        // const result = await client.query(query, values);
        // if (result.rowCount > 0) {
        //     let token: string = jwt.sign(username, process.env.secretKey);
        //     return res.status(200).send("Login OK!" + token);
        // } else {
        //     return res.status(404).send('User not found');
        // }
    } catch (err) {
        console.error('Query Error', err);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/data', async (req, res) => {
    try {
        let username: string = req.body.username;
        let password: string = req.body.password;
        let role: string = req.body.role;
        let fullname: CharacterData = req.body.fullname;
        try {
            const hashedPassword = await bcrypt.hash(password, process.env.passwordsalt);
            password = hashedPassword;
        } catch (err) {
            console.error('Error hashing password', err);
        }
        if (!username) {
            return res.status(400).send('username is required');
        }
        if (!password) {
            return res.status(400).send('password is required');
        }
        
        if(fullname.length < 2){
            return res.status(400).send('fullname must be grater than 2 letters');
        }

        // Check if the username already exists
        const checkQuery = `SELECT * FROM users WHERE username = $1`;
        //const checkResult = await client.query(checkQuery, [username]);
        const objUser = {
            username,
            password,
            role,
            fullname
        }
        const people = await person.create(objUser);

        // if (checkResult.rows.length > 0) {
        //     return res.status(400).send('Username already exists. Please choose a different one.');
        // }
        if (role == 'a' || role == 'u') {
            const query = `INSERT INTO users (username, password, role, fullname) VALUES ($1, $2, $3, $4) RETURNING *`;
            const values = [username, password, role, fullname];

            const result = await person.create(objUser);
            //const result = await client.query(query, values);
            return res.status(200).send("OK!" + result);
        } else {
            return res.status(400).send('role is required in "u" for user or "a" for admin');
        }
    } catch (err) {
        console.error('Query Error', err);
        res.status(500).send('Internal Server Error');
    }
});

app.delete('/data', async (req, res) => {
    try {
        const username: string = req.body.username;

        // Check if the username already exists
        const checkQuery = `SELECT * FROM users WHERE username = $1`;
        // const checkResult = await client.query(checkQuery, [username]);

        // if (checkResult.rows.length > 0) {
        //     const query = `DELETE FROM users WHERE username = ($1) RETURNING *`;

        //     const result = await client.query(query, [username]);
        //     res.json(result.rows[0]);
        //     return res.status(200).send("OK!");
        // } else {
        //     return res.status(400).send('No user found');
        // }
    } catch (err) {
        console.error('Query Error', err);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORTEX, () =>
    console.log(`your server is running on port ${PORTEX}`)
);

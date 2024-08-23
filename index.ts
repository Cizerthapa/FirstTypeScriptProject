import * as express from 'express';
import * as bodyParser from 'body-parser';
import client  from './src/databaseConnect/databaseconn';  // Import the client

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
        const result = await client.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        console.error('Query Error', err);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORTEX, () =>
    console.log(`your server is running on port ${PORTEX}`)
);

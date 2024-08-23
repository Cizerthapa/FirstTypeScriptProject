// src/databaseConnect/databaseconn
import * as pg from 'pg';

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
export default client;
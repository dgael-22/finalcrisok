const mysql = require('mysql2');

// Check if we should use SQLite (default for local if DB_HOST is not set or set to 'sqlite')
const useSqlite = process.env.DB_TYPE === 'sqlite' || !process.env.DB_HOST || process.env.DB_HOST === 'localhost';

let db;

if (useSqlite) {
    console.log('Using SQLite Database');
    db = require('./db_sqlite');
} else {
    console.log('Using MySQL Database');
    db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        ssl: {
            rejectUnauthorized: false
        }
    });

    db.connect((err) => {
        if (err) {
            console.error('Error connecting to MySQL:', err);
            return;
        }
        console.log('Connected to MySQL database: ' + (process.env.DB_NAME || 'default'));
    });
}

module.exports = db;

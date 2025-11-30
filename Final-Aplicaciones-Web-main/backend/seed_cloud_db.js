const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');

// Aiven DB Credentials
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false
    },
    multipleStatements: true // Required to run the full SQL script
};

console.log('Connecting to database...');
const connection = mysql.createConnection(dbConfig);

const sqlPath = path.join(__dirname, '../database.sql');
const sql = fs.readFileSync(sqlPath, 'utf8');

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', JSON.stringify(err, null, 2));
        console.error('Full Error:', err);
        process.exit(1);
    }
    console.log('Connected! Running seed script...');

    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error executing seed script:', err);
            process.exit(1);
        }
        console.log('Database seeded successfully!');
        console.log('Results:', results);
        connection.end();
        process.exit(0);
    });
});

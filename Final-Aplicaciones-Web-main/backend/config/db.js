const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // USER MUST UPDATE THIS
    password: 'root',      // USER MUST UPDATE THIS
    database: 'dress_shop_db'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database: dress_shop_db');
});

module.exports = db;

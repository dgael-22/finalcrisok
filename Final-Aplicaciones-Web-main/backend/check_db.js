const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'dress_shop_db'
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database.');

    // Check users
    connection.query('SELECT * FROM users', (err, results) => {
        if (err) console.error('Error fetching users:', err);
        else console.log('Users:', results);

        // Check columns in products
        connection.query('SHOW COLUMNS FROM products', (err, results) => {
            if (err) console.error('Error fetching columns:', err);
            else console.log('Product Columns:', results.map(c => c.Field));

            connection.end();
        });
    });
});

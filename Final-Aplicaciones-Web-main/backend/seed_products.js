const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'dress_shop_db'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database.');

    const products = [
        ['Gala Real Azul', 'Majestuoso vestido de gala en azul real.', 150.00, 'assets/blue-dress.jpg', 8],
        ['Esmeralda Velvet', 'Sofisticado vestido de terciopelo verde esmeralda.', 135.00, 'assets/green-dress.jpg', 12],
        ['Novia de Ensueño', 'Vestido de novia con encaje y cola larga.', 599.99, 'assets/wedding-dress.jpg', 5]
    ];

    const sql = 'INSERT INTO products (name, description, price, image_url, stock) VALUES ?';

    db.query(sql, [products], (err, result) => {
        if (err) {
            console.error('Error inserting products:', err);
        } else {
            console.log(`Inserted ${result.affectedRows} products.`);
        }
        db.end();
    });
});

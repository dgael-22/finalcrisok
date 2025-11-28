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

    // 1. Remove duplicates (keep the one with the lowest ID)
    const deleteDuplicatesSql = `
        DELETE t1 FROM products t1
        INNER JOIN products t2 
        WHERE t1.id > t2.id AND t1.name = t2.name;
    `;

    db.query(deleteDuplicatesSql, (err, result) => {
        if (err) {
            console.error('Error deleting duplicates:', err);
        } else {
            console.log(`Deleted ${result.affectedRows} duplicate products.`);
        }

        // 2. Insert NEW unique products
        const newProducts = [
            ['Seda Púrpura Imperial', 'Vestido de noche en seda púrpura con drapeado elegante.', 180.00, 'assets/purple-dress.jpg', 6],
            ['Fiesta Dorada Sequin', 'Vestido corto de lentejuelas doradas para fiestas exclusivas.', 95.00, 'assets/gold-sequin.jpg', 20]
        ];

        const insertSql = 'INSERT INTO products (name, description, price, image_url, stock) VALUES ?';

        db.query(insertSql, [newProducts], (err, result) => {
            if (err) {
                console.error('Error inserting new products:', err);
            } else {
                console.log(`Inserted ${result.affectedRows} new unique products.`);
            }
            db.end();
        });
    });
});

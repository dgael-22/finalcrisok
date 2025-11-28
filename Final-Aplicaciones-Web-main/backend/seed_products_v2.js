const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'dress_shop_db'
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting:', err);
        return;
    }
    console.log('Connected.');

    const newProducts = [
        ['Vestido Maxi Bohemio', 'Estilo bohemio para la playa.', 55.00, 'assets/boho-dress.jpg', 20, 'S,M,L', 'Verano'],
        ['Vestido Sirena Dorado', 'Brillante y ajustado para fiestas.', 180.00, 'assets/gold-dress.jpg', 5, 'M,L', 'Gala'],
        ['Vestido Corto Rojo', 'Atrevido y chic.', 75.00, 'assets/red-short-dress.jpg', 15, 'XS,S,M', 'Coctel'],
        ['Vestido Princesa Rosa', 'Dulce y voluminoso.', 250.00, 'assets/pink-princess.jpg', 3, 'S,M', 'Gala'],
        ['Vestido Oficina Gris', 'Profesional y elegante.', 65.00, 'assets/grey-office.jpg', 10, 'S,M,L,XL', 'Casual'],
        ['Vestido Playa Blanco', 'Fresco y ligero.', 40.00, 'assets/white-beach.jpg', 30, 'S,M,L', 'Verano']
    ];

    const query = "INSERT INTO products (name, description, price, image_url, stock, sizes, category) VALUES ?";
    connection.query(query, [newProducts], (err, res) => {
        if (err) {
            console.error('Error inserting products:', err);
        } else {
            console.log(`Inserted ${res.affectedRows} new products.`);
        }
        connection.end();
    });
});

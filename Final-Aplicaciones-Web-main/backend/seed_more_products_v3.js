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
        ['Vestido Lentejuelas Plata', 'Deslumbrante vestido de lentejuelas plateadas.', 160.00, 'assets/silver-sequin.jpg', 8, 'XS,S,M', 'Gala'],
        ['Vestido Gasa Lavanda', 'Suave y romántico vestido de gasa.', 95.00, 'assets/lavender-chiffon.jpg', 12, 'S,M,L', 'Verano'],
        ['Vestido Tubo Azul Marino', 'Elegancia sobria para la oficina.', 70.00, 'assets/navy-sheath.jpg', 15, 'M,L,XL', 'Casual'],
        ['Vestido Encaje Blanco', 'Delicado vestido de encaje.', 110.00, 'assets/white-lace.jpg', 6, 'S,M', 'Novia'],
        ['Vestido Terciopelo Burdeos', 'Lujoso vestido de invierno.', 140.00, 'assets/burgundy-velvet.jpg', 10, 'S,M,L', 'Gala'],
        ['Vestido Playero Tropical', 'Estampado vibrante para vacaciones.', 45.00, 'assets/tropical-beach.jpg', 25, 'S,M,L,XL', 'Verano'],
        ['Vestido Midi Negro', 'Versátil y chic.', 60.00, 'assets/black-midi.jpg', 18, 'XS,S,M,L', 'Casual'],
        ['Vestido Fiesta Rojo', 'Impactante vestido rojo.', 130.00, 'assets/red-party.jpg', 7, 'M,L', 'Coctel']
    ];

    const query = "INSERT INTO products (name, description, price, image_url, stock, sizes, category) VALUES ?";
    connection.query(query, [newProducts], (err, res) => {
        if (err) {
            console.error('Error inserting products:', err);
            console.error('Query:', query);
            console.error('Values:', newProducts);
        } else {
            console.log(`Inserted ${res.affectedRows} new products.`);
        }
        connection.end();
    });
});

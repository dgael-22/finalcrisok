const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'dress_shop_db',
    multipleStatements: true // Enable multiple statements for batch updates
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting:', err);
        return;
    }
    console.log('Connected.');

    const steps = [
        // 1. Insert Default User
        (cb) => {
            console.log('Step 1: Checking/Inserting Default User...');
            connection.query('SELECT * FROM users WHERE id = 1', (err, res) => {
                if (err) return cb(err);
                if (res.length === 0) {
                    connection.query("INSERT INTO users (id, name, email, password) VALUES (1, 'Demo User', 'demo@example.com', 'password123')", (err) => {
                        if (err) return cb(err);
                        console.log('Default user inserted.');
                        cb();
                    });
                } else {
                    console.log('Default user already exists.');
                    cb();
                }
            });
        },
        // 2. Add Category Column
        (cb) => {
            console.log('Step 2: Adding category column...');
            connection.query("SHOW COLUMNS FROM products LIKE 'category'", (err, res) => {
                if (err) return cb(err);
                if (res.length === 0) {
                    connection.query("ALTER TABLE products ADD COLUMN category VARCHAR(50) DEFAULT 'General'", (err) => {
                        if (err) return cb(err);
                        console.log('Category column added.');
                        cb();
                    });
                } else {
                    console.log('Category column already exists.');
                    cb();
                }
            });
        },
        // 3. Update Existing Products with Categories
        (cb) => {
            console.log('Step 3: Updating existing product categories...');
            const updates = [
                "UPDATE products SET category = 'Gala' WHERE name LIKE '%Gala%' OR name LIKE '%Noche%'",
                "UPDATE products SET category = 'Verano' WHERE name LIKE '%Verano%' OR name LIKE '%Floral%'",
                "UPDATE products SET category = 'Coctel' WHERE name LIKE '%Coctel%' OR name LIKE '%Negro%'",
                "UPDATE products SET category = 'Novia' WHERE name LIKE '%Novia%'",
                "UPDATE products SET category = 'Gala' WHERE name LIKE '%Esmeralda%'"
            ];

            let completed = 0;
            updates.forEach(query => {
                connection.query(query, (err) => {
                    if (err) console.error('Error updating category:', err);
                    completed++;
                    if (completed === updates.length) cb();
                });
            });
        },
        // 4. Insert New Products
        (cb) => {
            console.log('Step 4: Inserting new products...');
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
                if (err) return cb(err);
                console.log(`Inserted ${res.affectedRows} new products.`);
                cb();
            });
        }
    ];

    // Execute steps sequentially
    const runStep = (index) => {
        if (index >= steps.length) {
            console.log('Migration complete.');
            connection.end();
            return;
        }
        steps[index]((err) => {
            if (err) {
                console.error('Migration failed at step ' + (index + 1), err);
                connection.end();
                return;
            }
            runStep(index + 1);
        });
    };

    runStep(0);
});

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Products Table
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    image_url TEXT,
    stock INTEGER DEFAULT 0,
    sizes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    total REAL NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 4. Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    price REAL NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Optional: Insert dummy data
INSERT OR IGNORE INTO products (name, description, price, image_url, stock, sizes) VALUES 
('Vestido de Noche Rojo', 'Elegante vestido largo de seda roja.', 120.00, 'assets/red-dress.jpg', 10, 'S,M,L'),
('Vestido de Verano Floral', 'Vestido corto con estampado floral.', 45.50, 'assets/floral-dress.jpg', 25, 'XS,S,M,L'),
('Vestido de Coctel Negro', 'Clásico vestido negro para ocasiones especiales.', 89.99, 'assets/black-dress.jpg', 15, 'S,M,L,XL'),
('Gala Real Azul', 'Majestuoso vestido de gala en azul real.', 150.00, 'assets/blue-dress.jpg', 8, 'M,L,XL'),
('Esmeralda Velvet', 'Sofisticado vestido de terciopelo verde esmeralda.', 135.00, 'assets/green-dress.jpg', 12, 'S,M,L'),
('Novia de Ensueño', 'Vestido de novia con encaje y cola larga.', 599.99, 'assets/wedding-dress.jpg', 5, 'S,M,L');

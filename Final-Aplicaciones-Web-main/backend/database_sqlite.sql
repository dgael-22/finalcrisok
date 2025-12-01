-- Drop tables for clean reset
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;

-- 1. Users Table
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Products Table
CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    image_url TEXT,
    category TEXT,
    stock INTEGER DEFAULT 0,
    sizes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. Orders Table
CREATE TABLE orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    total REAL NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 4. Order Items Table
CREATE TABLE order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    price REAL NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Insert Data (Categorized)
INSERT INTO products (name, description, price, image_url, category, stock, sizes) VALUES 
-- Gala
('Vestido de Noche Rojo', 'Elegante vestido largo de seda roja, perfecto para eventos de gala.', 120.00, 'assets/red-dress.jpg', 'Gala', 10, 'S,M,L'),
('Gala Real Azul', 'Majestuoso vestido de gala en azul real con detalles en pedrería.', 150.00, 'assets/blue-dress.jpg', 'Gala', 8, 'M,L,XL'),
('Esmeralda Velvet', 'Sofisticado vestido de terciopelo verde esmeralda con corte sirena.', 135.00, 'assets/green-dress.jpg', 'Gala', 12, 'S,M,L'),
('Dorado Imperial', 'Vestido largo dorado con lentejuelas, brilla toda la noche.', 180.00, 'assets/gold-dress.jpg', 'Gala', 5, 'S,M,L'),

-- Cóctel
('Vestido de Coctel Negro', 'Clásico vestido negro (LBD) para ocasiones especiales.', 89.99, 'assets/black-dress.jpg', 'Cóctel', 15, 'S,M,L,XL'),
('Rosa Pastel Midi', 'Vestido midi en tono rosa pastel, ideal para bodas de día.', 95.00, 'assets/pink-midi.jpg', 'Cóctel', 10, 'XS,S,M'),
('Encaje Borgoña', 'Vestido corto de encaje color vino, elegante y moderno.', 75.00, 'assets/burgundy-lace.jpg', 'Cóctel', 18, 'S,M,L'),

-- Casual
('Vestido de Verano Floral', 'Vestido corto con estampado floral, fresco y ligero.', 45.50, 'assets/floral-dress.jpg', 'Casual', 25, 'XS,S,M,L'),
('Maxi Vestido Bohemio', 'Vestido largo estilo boho chic, cómodo para el día a día.', 55.00, 'assets/boho-dress.jpg', 'Casual', 20, 'S,M,L,XL'),
('Vestido Camisero Blanco', 'Básico imprescindible, vestido camisero de lino blanco.', 40.00, 'assets/white-shirt-dress.jpg', 'Casual', 30, 'S,M,L'),

-- Novia
('Novia de Ensueño', 'Vestido de novia con encaje francés y cola larga.', 599.99, 'assets/wedding-dress.jpg', 'Novia', 5, 'S,M,L'),
('Boda Civil Minimalista', 'Vestido blanco sencillo y elegante para boda civil.', 250.00, 'assets/civil-wedding.jpg', 'Novia', 8, 'S,M,L');

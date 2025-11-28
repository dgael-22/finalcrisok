-- 1. Create Databaseeeeeeeeee
CREATE DATABASE IF NOT EXISTS dress_shop_db;
USE dress_shop_db;

-- 2. Create Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create Products Table (Vestidos)
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255),
    stock INT DEFAULT 0,
    sizes VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Create Orders Table (Pedidos)
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 5. Create Order Items Table (Detalle de Pedido)
-- This ensures we have at least 3 related tables (Users -> Orders -> OrderItems -> Products)
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Optional: Insert some dummy data for testing (Catalog List requirement)
INSERT INTO products (name, description, price, image_url, stock, sizes) VALUES 
('Vestido de Noche Rojo', 'Elegante vestido largo de seda roja.', 120.00, 'assets/red-dress.jpg', 10, 'S,M,L'),
('Vestido de Verano Floral', 'Vestido corto con estampado floral.', 45.50, 'assets/floral-dress.jpg', 25, 'XS,S,M,L'),
('Vestido de Coctel Negro', 'Clásico vestido negro para ocasiones especiales.', 89.99, 'assets/black-dress.jpg', 15, 'S,M,L,XL'),
('Gala Real Azul', 'Majestuoso vestido de gala en azul real.', 150.00, 'assets/blue-dress.jpg', 8, 'M,L,XL'),
('Esmeralda Velvet', 'Sofisticado vestido de terciopelo verde esmeralda.', 135.00, 'assets/green-dress.jpg', 12, 'S,M,L'),
('Novia de Ensueño', 'Vestido de novia con encaje y cola larga.', 599.99, 'assets/wedding-dress.jpg', 5, 'S,M,L');

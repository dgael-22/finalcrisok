const express = require('express');
const router = express.Router();
const db = require('../config/db');

// --- GET ROUTES (Listados) ---

// 1. Get All Products (Catálogo de Vestidos)
router.get('/products', (req, res) => {
    const query = 'SELECT * FROM products';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// 2. Get Orders by User (Histórico de Pedidos)
router.get('/orders/:userId', (req, res) => {
    const userId = req.params.userId;
    const query = 'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC';
    db.query(query, [userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// --- POST ROUTES (Formularios) ---

// 3. Register User (Registro de Usuarios)
router.post('/users/register', (req, res) => {
    const { name, email, password } = req.body;
    // Basic validation
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [name, email, password], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'User registered successfully', userId: result.insertId });
    });
});

// 4. Create Order (Checkout)
router.post('/orders', (req, res) => {
    const { userId, items, total } = req.body; // items is array of { productId, quantity, price }

    if (!userId || !items || items.length === 0) {
        return res.status(400).json({ error: 'Invalid order data' });
    }

    // Transaction to ensure data integrity
    db.beginTransaction(err => {
        if (err) return res.status(500).json({ error: err.message });

        const orderQuery = 'INSERT INTO orders (user_id, total) VALUES (?, ?)';
        db.query(orderQuery, [userId, total], (err, result) => {
            if (err) {
                return db.rollback(() => res.status(500).json({ error: err.message }));
            }

            const orderId = result.insertId;
            const itemValues = items.map(item => [orderId, item.productId, item.quantity, item.price]);
            const itemsQuery = 'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?';

            db.query(itemsQuery, [itemValues], (err, result) => {
                if (err) {
                    return db.rollback(() => res.status(500).json({ error: err.message }));
                }

                db.commit(err => {
                    if (err) {
                        return db.rollback(() => res.status(500).json({ error: err.message }));
                    }
                    res.json({ message: 'Order placed successfully', orderId });
                });
            });
        });
    });
});

module.exports = router;

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');

const helmet = require('helmet');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet({
    contentSecurityPolicy: false, // Disable CSP to allow Bootstrap CDN and other external scripts
    crossOriginEmbedderPolicy: false
}));
app.use(compression());
app.use(cors({
    origin: process.env.FRONTEND_URL || '*', // Allow all for dev, restrict in prod
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api', apiRoutes);

// Serve Static Files (Frontend)
const path = require('path');
// Serve for root path
app.use(express.static(path.join(__dirname, '../frontend/dist/dress-shop-frontend')));
// Serve for GitHub Pages base-href path (fixes local 404s for assets)
app.use('/finalcrisok', express.static(path.join(__dirname, '../frontend/dist/dress-shop-frontend')));

// Catch-all handler for SPA (Angular)
app.get('*', (req, res) => {
    // Skip API routes
    if (req.path.startsWith('/api')) return res.status(404).send('API Endpoint not found');

    res.sendFile(path.join(__dirname, '../frontend/dist/dress-shop-frontend/index.html'));
});

// Root Endpoint
app.get('/', (req, res) => {
    res.send('Dress Shop API is running...');
});

// Temporary Seed Endpoint
const fs = require('fs');
const db = require('./config/db');

app.get('/seed', (req, res) => {
    const sqlPath = path.join(__dirname, 'database.sql');
    // Check if file exists
    if (!fs.existsSync(sqlPath)) {
        // Try looking one level up if not found (for local dev vs prod structure)
        const sqlPathUp = path.join(__dirname, '../database.sql');
        if (fs.existsSync(sqlPathUp)) {
            const sql = fs.readFileSync(sqlPathUp, 'utf8');
            db.query(sql, (err, result) => {
                if (err) return res.status(500).send('Error seeding database: ' + err.message);
                res.send('Database seeded successfully!');
            });
            return;
        }
        return res.status(500).send('database.sql not found');
    }

    const sql = fs.readFileSync(sqlPath, 'utf8');
    db.query(sql, (err, result) => {
        if (err) return res.status(500).send('Error seeding database: ' + err.message);
        res.send('Database seeded successfully!');
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

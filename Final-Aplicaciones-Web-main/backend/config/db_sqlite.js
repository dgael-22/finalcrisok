const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create/Open database file in the backend directory
const dbPath = path.resolve(__dirname, '../dress_shop.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening SQLite database:', err.message);
    } else {
        console.log('Connected to SQLite database: dress_shop.sqlite');
    }
});

// Wrapper to mimic MySQL's db.query(sql, [params], callback)
const dbWrapper = {
    query: (sql, params, callback) => {
        // Handle optional params argument
        if (typeof params === 'function') {
            callback = params;
            params = [];
        }

        // Determine if it's a SELECT (all) or INSERT/UPDATE/DELETE (run)
        const method = sql.trim().toUpperCase().startsWith('SELECT') ? 'all' : 'run';

        db[method](sql, params, function (err, rows) {
            if (err) {
                return callback(err);
            }
            // For INSERT, 'this' contains lastID and changes
            if (method === 'run') {
                // Mimic MySQL result object
                const result = {
                    insertId: this.lastID,
                    affectedRows: this.changes
                };
                return callback(null, result);
            }
            // For SELECT, rows is the array of results
            return callback(null, rows);
        });
    },
    // Expose raw db object if needed
    raw: db,
    // Transaction helpers (SQLite is serial by default, but explicit transactions are safer)
    beginTransaction: (callback) => {
        db.run('BEGIN TRANSACTION', (err) => callback(err));
    },
    commit: (callback) => {
        db.run('COMMIT', (err) => callback(err));
    },
    rollback: (callback) => {
        db.run('ROLLBACK', (err) => callback(err));
    }
};

module.exports = dbWrapper;

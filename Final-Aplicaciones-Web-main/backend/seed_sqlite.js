const fs = require('fs');
const path = require('path');
const db = require('./config/db_sqlite');

const sqlPath = path.join(__dirname, 'database_sqlite.sql');
const sql = fs.readFileSync(sqlPath, 'utf8');

// Split by semicolon to get individual statements
const statements = sql.split(';').filter(stmt => stmt.trim() !== '');

console.log('Seeding SQLite database...');

db.raw.serialize(() => {
    statements.forEach(stmt => {
        db.raw.run(stmt, (err) => {
            if (err) {
                console.error('Error executing statement:', err.message);
                console.error('Statement:', stmt);
            }
        });
    });
    console.log('Database seeded successfully!');
});

db.raw.close();

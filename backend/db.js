// db.js
const mysql = require('mysql2/promise'); // Note the /promise import

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // Add your password if set
  database: 'library_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
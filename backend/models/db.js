const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Get the database file path from environment variables (default to 'sqlite3-database.db' if not set)
const dbFilePath = process.env.DB_FILE || path.join(__dirname, 'public', 'sqlite3-database.db');

// Ensure the directory exists
const fs = require('fs');
const dir = path.dirname(dbFilePath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Open a connection to the SQLite database
const db = new sqlite3.Database(dbFilePath, (err) => {
  if (err) {
    console.error('Error opening SQLite database:', err.message);
  } else {
    console.log('Connected to the SQLite database at', dbFilePath);
  }
});

// Create table for users if it doesn't exist
const createUserTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      salary REAL DEFAULT 0,
      balance REAL DEFAULT 0
    );
  `;
  
  db.run(query, (err) => {
    if (err) {
      console.error('Error creating user table:', err.message);
    } else {
      console.log('User table is ready');
    }
  });
};

// Function to register a new user
const registerUser = (username, password, salary = 0, balance = 0, callback) => {
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return callback(err);

    const query = 'INSERT INTO users (username, password, salary, balance) VALUES (?, ?, ?, ?)';
    db.run(query, [username, hashedPassword, salary, balance], function(err) {
      if (err) return callback(err);
      callback(null, this.lastID); // Return the ID of the new user
    });
  });
};

// Authenticate user (login)
const authenticateUser = (username, password, callback) => {
  const query = 'SELECT * FROM users WHERE username = ?';
  db.get(query, [username], (err, user) => {
    if (err) return callback(err);
    if (!user) return callback(null, false); // User not found

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return callback(err);
      if (isMatch) {
        callback(null, user); // Password matches
      } else {
        callback(null, false); // Password incorrect
      }
    });
  });
};

// Get all workers
const getWorkers = (callback) => {
  const query = 'SELECT * FROM users';
  db.all(query, [], (err, rows) => {
    if (err) return callback(err);
    callback(null, rows); // Return the rows (workers)
  });
};

// Pay a worker by updating their balance
const payWorker = (workerId, amount, callback) => {
  // You may want to check if the worker has enough balance or other business logic
  const query = 'UPDATE users SET balance = balance + ? WHERE id = ?';
  db.run(query, [amount, workerId], function (err) {
    if (err) return callback(err);
    if (this.changes === 0) return callback(new Error('Worker not found or payment failed.'));
    callback(null, { success: true });
  });
};

// Export the database functions
module.exports = {
  db,
  createUserTable,
  registerUser,
  authenticateUser,
  getWorkers,
  payWorker,
};

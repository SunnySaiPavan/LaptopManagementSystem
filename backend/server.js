const express = require('express');
const cors = require('cors');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// Initialize express app
const app = express();
const PORT = 5000;

// Enable CORS
app.use(cors());
app.use(express.json());

// SQLite Database Setup
const db = new sqlite3.Database(':memory:'); // Temporary in-memory DB for demo

// Create tables for the laptop and employee management system
db.serialize(() => {
  db.run("CREATE TABLE laptops (id INT, brand TEXT, model TEXT, status TEXT, purchaseDate TEXT)");
  db.run("CREATE TABLE employees (id INT, name TEXT, email TEXT, department TEXT)");
});

// Sample data insertion (for testing)
db.serialize(() => {
  const stmt = db.prepare("INSERT INTO laptops VALUES (?, ?, ?, ?, ?)");
  stmt.run(1, 'Dell', 'XPS 13', 'available', '2022-01-15');
  stmt.run(2, 'HP', 'Spectre x360', 'assigned', '2023-03-20');
  stmt.finalize();
});

// Routes for handling laptop operations
app.get('/api/laptops', (req, res) => {
  db.all("SELECT * FROM laptops", (err, rows) => {
    if (err) {
      return res.status(500).send({ error: err.message });
    }
    res.status(200).json(rows);
  });
});

// Serve static files from React build
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

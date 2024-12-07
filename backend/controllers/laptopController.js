const db = require('../models/database');

exports.addLaptop = (req, res) => {
  const { brand, model, serialNumber, status, purchaseDate } = req.body;
  const query = `INSERT INTO laptops (brand, model, serialNumber, status, purchaseDate) VALUES (?, ?, ?, ?, ?)`;
  db.run(query, [brand, model, serialNumber, status, purchaseDate], function (err) {
    if (err) {
      return res.status(500).send({ error: err.message });
    }
    res.status(201).send({ id: this.lastID, message: 'Laptop added successfully' });
  });
};

exports.getLaptops = (req, res) => {
  const query = `SELECT * FROM laptops`;
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).send({ error: err.message });
    }
    res.status(200).send(rows);
  });
};

exports.updateLaptop = (req, res) => {
  const { id } = req.params;
  const { brand, model, serialNumber, status, purchaseDate } = req.body;
  const query = `UPDATE laptops SET brand = ?, model = ?, serialNumber = ?, status = ?, purchaseDate = ? WHERE id = ?`;
  db.run(query, [brand, model, serialNumber, status, purchaseDate, id], function (err) {
    if (err) {
      return res.status(500).send({ error: err.message });
    }
    res.status(200).send({ message: 'Laptop updated successfully' });
  });
};

exports.deleteLaptop = (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM laptops WHERE id = ?`;
  db.run(query, [id], function (err) {
    if (err) {
      return res.status(500).send({ error: err.message });
    }
    res.status(200).send({ message: 'Laptop deleted successfully' });
  });
};

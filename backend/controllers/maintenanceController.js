const db = require('../models/database');

// Add a maintenance log
exports.addMaintenanceLog = (req, res) => {
  const { laptopId, description, status, cost, loggedAt } = req.body;
  const query = `
    INSERT INTO maintenance (laptopId, description, status, cost, loggedAt)
    VALUES (?, ?, ?, ?, ?)
  `;
  const updateLaptopStatus = `UPDATE laptops SET status = 'maintenance' WHERE id = ?`;

  db.run(query, [laptopId, description, status, cost, loggedAt], function (err) {
    if (err) {
      return res.status(500).send({ error: err.message });
    }
    db.run(updateLaptopStatus, [laptopId], (err) => {
      if (err) {
        return res.status(500).send({ error: err.message });
      }
      res.status(201).send({ message: 'Maintenance log added successfully' });
    });
  });
};

// Get maintenance history for a specific laptop
exports.getMaintenanceHistory = (req, res) => {
  const { laptopId } = req.params;
  const query = `SELECT * FROM maintenance WHERE laptopId = ?`;
  db.all(query, [laptopId], (err, rows) => {
    if (err) {
      return res.status(500).send({ error: err.message });
    }
    res.status(200).send(rows);
  });
};

// Report an issue
exports.reportIssue = (req, res) => {
  const { laptopId, description, priority, reportedBy, reportedAt } = req.body;
  const query = `
    INSERT INTO issues (laptopId, description, priority, status, reportedBy, reportedAt)
    VALUES (?, ?, ?, 'open', ?, ?)
  `;

  db.run(query, [laptopId, description, priority, reportedBy, reportedAt], function (err) {
    if (err) {
      return res.status(500).send({ error: err.message });
    }
    res.status(201).send({ message: 'Issue reported successfully' });
  });
};

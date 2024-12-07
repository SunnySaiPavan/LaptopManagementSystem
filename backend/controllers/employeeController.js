const db = require('../models/database');

// Fetch all employees
exports.getAllEmployees = (req, res) => {
  const query = `SELECT * FROM employees`;
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).send({ error: err.message });
    }
    res.status(200).send(rows);
  });
};

// Assign a laptop to an employee
exports.assignLaptop = (req, res) => {
  const { laptopId, employeeId, assignedAt } = req.body;
  const query = `
    INSERT INTO assignments (laptopId, employeeId, assignedAt)
    VALUES (?, ?, ?)
  `;
  const updateLaptopStatus = `UPDATE laptops SET status = 'assigned' WHERE id = ?`;

  db.run(query, [laptopId, employeeId, assignedAt], function (err) {
    if (err) {
      return res.status(500).send({ error: err.message });
    }
    db.run(updateLaptopStatus, [laptopId], (err) => {
      if (err) {
        return res.status(500).send({ error: err.message });
      }
      res.status(201).send({ message: 'Laptop assigned successfully' });
    });
  });
};

// Fetch laptops assigned to a specific employee
exports.getLaptopsAssignedToEmployee = (req, res) => {
  const { employeeId } = req.params;
  const query = `
    SELECT laptops.id, laptops.brand, laptops.model, laptops.serialNumber, assignments.assignedAt
    FROM laptops
    INNER JOIN assignments ON laptops.id = assignments.laptopId
    WHERE assignments.employeeId = ? AND assignments.returnedAt IS NULL
  `;
  db.all(query, [employeeId], (err, rows) => {
    if (err) {
      return res.status(500).send({ error: err.message });
    }
    res.status(200).send(rows);
  });
};

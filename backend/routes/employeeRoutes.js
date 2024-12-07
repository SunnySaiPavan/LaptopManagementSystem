const express = require('express');
const {
  getAllEmployees,
  assignLaptop,
  getLaptopsAssignedToEmployee,
} = require('../controllers/employeeController');

const router = express.Router();

router.get('/employees', getAllEmployees); // Fetch all employees
router.post('/assignments', assignLaptop); // Assign laptop to employee
router.get('/assignments/:employeeId', getLaptopsAssignedToEmployee); // Fetch laptops assigned to an employee

module.exports = router;

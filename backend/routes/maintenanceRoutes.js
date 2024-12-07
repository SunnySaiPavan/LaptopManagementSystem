const express = require('express');
const {
  addMaintenanceLog,
  getMaintenanceHistory,
  reportIssue,
} = require('../controllers/maintenanceController');

const router = express.Router();

router.post('/maintenance', addMaintenanceLog); // Add maintenance log
router.get('/maintenance/:laptopId', getMaintenanceHistory); // View maintenance history
router.post('/issues', reportIssue); // Report an issue

module.exports = router;

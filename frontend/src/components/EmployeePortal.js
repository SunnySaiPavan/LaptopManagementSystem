import React, { useState, useEffect } from 'react';
import axios from '../services/api';

const EmployeePortal = ({ employeeId }) => {
  const [assignedLaptop, setAssignedLaptop] = useState(null);
  const [issue, setIssue] = useState({ description: '', priority: 'low' });

  const fetchAssignedLaptop = async () => {
    try {
      const response = await axios.get(`/assignments/${employeeId}`);
      setAssignedLaptop(response.data);
    } catch (err) {
      console.error('Error fetching assigned laptop:', err);
    }
  };

  const handleReportIssue = async () => {
    try {
      await axios.post('/issues', {
        laptopId: assignedLaptop.id,
        description: issue.description,
        priority: issue.priority,
        reportedBy: employeeId,
      });
      alert('Issue reported successfully!');
      setIssue({ description: '', priority: 'low' });
    } catch (err) {
      console.error('Error reporting issue:', err);
    }
  };

  useEffect(() => {
    fetchAssignedLaptop();
  }, [employeeId])

  return (
    <div>
      <h2>Employee Portal</h2>
      <h3>Assigned Laptop</h3>
      {assignedLaptop ? (
        <div>
          <p>
            <strong>Brand:</strong> {assignedLaptop.brand}
          </p>
          <p>
            <strong>Model:</strong> {assignedLaptop.model}
          </p>
          <p>
            <strong>Serial Number:</strong> {assignedLaptop.serialNumber}
          </p>
        </div>
      ) : (
        <p>No laptop assigned.</p>
      )}

      <h3>Report an Issue</h3>
      <textarea
        placeholder="Describe the issue"
        value={issue.description}
        onChange={(e) => setIssue({ ...issue, description: e.target.value })}
      />
      <select
        value={issue.priority}
        onChange={(e) => setIssue({ ...issue, priority: e.target.value })}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button onClick={handleReportIssue}>Report</button>
    </div>
  );
};

export default EmployeePortal;

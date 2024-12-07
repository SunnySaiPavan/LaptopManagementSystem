import React, { useState, useEffect } from 'react';
import axios from '../services/api';

const AdminDashboard = () => {
  const [overview, setOverview] = useState({ total: 0, assigned: 0, available: 0, maintenance: 0 });

  useEffect(() => {
    axios.get('/laptops').then((response) => {
      const laptops = response.data;
      const total = laptops.length;
      const assigned = laptops.filter((laptop) => laptop.status === 'assigned').length;
      const available = laptops.filter((laptop) => laptop.status === 'available').length;
      const maintenance = laptops.filter((laptop) => laptop.status === 'maintenance').length;
      setOverview({ total, assigned, available, maintenance });
    });
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div className="overview">
        <div>Total Laptops: {overview.total}</div>
        <div>Assigned Laptops: {overview.assigned}</div>
        <div>Available Laptops: {overview.available}</div>
        <div>Laptops Under Maintenance: {overview.maintenance}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;

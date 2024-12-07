import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import LaptopManagement from './components/LaptopManagement';
import EmployeePortal from './components/EmployeePortal';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/laptops" element={<LaptopManagement />} />
          <Route path="/employee" element={<EmployeePortal employeeId={2} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

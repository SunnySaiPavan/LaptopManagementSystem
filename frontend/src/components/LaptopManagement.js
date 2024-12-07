import React, { useState, useEffect } from 'react';
import axios from '../services/api';

const LaptopManagement = () => {
  const [laptops, setLaptops] = useState([]);
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    serialNumber: '',
    status: 'available',
    purchaseDate: '',
  });

  const fetchLaptops = async () => {
    try {
      const response = await axios.get('/laptops');
      setLaptops(response.data);
    } catch (err) {
      console.error('Error fetching laptops:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddLaptop = async () => {
    try {
      await axios.post('/laptops', formData);
      fetchLaptops();
      setFormData({
        brand: '',
        model: '',
        serialNumber: '',
        status: 'available',
        purchaseDate: '',
      });
    } catch (err) {
      console.error('Error adding laptop:', err);
    }
  };

  const handleDeleteLaptop = async (id) => {
    try {
      await axios.delete(`/laptops/${id}`);
      fetchLaptops();
    } catch (err) {
      console.error('Error deleting laptop:', err);
    }
  };

  useEffect(() => {
    fetchLaptops();
  }, []);

  return (
    <div>
      <h2>Laptop Management</h2>
      <div>
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={formData.brand}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="model"
          placeholder="Model"
          value={formData.model}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="serialNumber"
          placeholder="Serial Number"
          value={formData.serialNumber}
          onChange={handleInputChange}
        />
        <select name="status" value={formData.status} onChange={handleInputChange}>
          <option value="available">Available</option>
          <option value="assigned">Assigned</option>
          <option value="maintenance">Maintenance</option>
        </select>
        <input
          type="date"
          name="purchaseDate"
          value={formData.purchaseDate}
          onChange={handleInputChange}
        />
        <button onClick={handleAddLaptop}>Add Laptop</button>
      </div>
      <div>
        <h3>Existing Laptops</h3>
        <ul>
          {laptops.map((laptop) => (
            <li key={laptop.id}>
              {laptop.brand} {laptop.model} - {laptop.status}
              <button onClick={() => handleDeleteLaptop(laptop.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LaptopManagement;

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


const EmployeeForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/").pop();
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    age: '',
    
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id !== 'new') {
      // Fetch employee details by ID and set the state
      // Simulating fetching data
      const fetchEmployee = {
        name: '',
        email: '',
        phone: '',
        gender: '',
        age: '',
        
      };
      setEmployee(fetchEmployee);
      setIsEditing(true);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update existing employee logic
      console.log('Employee updated:', employee);
    } else {
      // Add new employee logic
      console.log('New employee added:', employee);
    }
    navigate('/employees');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={employee.name} onChange={handleChange} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={employee.email} onChange={handleChange} />
      </div>
      <div>
        <label>Phone Number:</label>
        <input type="text" name="phone" value={employee.phone} onChange={handleChange} />
      </div>
      <div>
        <label>Gender:</label>
        <select name="gender" value={employee.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <label>Age:</label>
        <input type="number" name="age" value={employee.age} onChange={handleChange} />
      </div>
     
      <button type="submit">{isEditing ? 'Update' : 'Register'} Employee</button>
    </form>
  );
};

export default EmployeeForm;
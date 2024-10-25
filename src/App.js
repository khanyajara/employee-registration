import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Auth from './components/auth';
import Form from './components/form';
import '../src/App.css';
import Login from './components/login';
import Signup from './components/Sign-up';

const App = () => {
  const [formState, setFormState] = useState({ name: '', email: '', phone: '' });
  const [employees, setEmployees] = useState([]); // Assuming you want to manage employees here

  const deleteEmployee = (id) => {

    setEmployees(employees.filter(employee => employee.id !== id));
  }

  const handleUpdate = async (e, id) => { // Pass the id for the employee being updated
    e.preventDefault();
    try {
      const response = await fetch(`/api/employees/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });
      const data = await response.json();
      setEmployees(employees.map(employee => (employee.id === id ? data : employee))); // Update the specific employee
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  return (
    <Router>
      <div className='container'>
        <div className='head'>
          <h1>Employee Registration Form</h1>
        </div>
        <nav>
          <Link to="/Home"></Link>
         
          <br/>
         
          <Link to="/auth"></Link>
        </nav>

        <Routes>
          <Route path="/Home" element={<Form employees={employees} deleteEmployee={deleteEmployee} handleUpdate={handleUpdate} />} />
          <Route path="/login" element={<Login />} />
         
          <Route path="/" element={<Auth />} />
         
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [formState, setFormState] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`/api/employees/${id}`);
        const data = await response.json();
        setEmployee(data);
        setFormState({ name: data.name, email: data.email, phone: data.phone });
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
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
      setEmployee(data);
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  if (!employee) return <div>Loading...</div>;

  return (
    <div>
      <h1>{employee.name}</h1>
      <p>Email: {employee.email}</p>
      <p>Phone: {employee.phone}</p>

      <h2>Update Employee Details</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={formState.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email: </label>
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone: </label>
          <input
            type="text"
            name="phone"
            value={formState.phone}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EmployeeDetails;

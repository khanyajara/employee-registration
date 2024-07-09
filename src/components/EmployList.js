import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const EmployeeList = () => {
  const [employees, setEmployees] = useState([
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      gender: 'Male',
      age: '30',
      
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '123-456-7891',
      gender: 'Female',
      age: '28',
      
    },
    {
      id: '3',
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      phone: '123-456-7892',
      gender: 'Female',
      age: '25',
      
    },
    {
      id: '4',
      name: 'Bob Brown',
      email: 'bob.brown@example.com',
      phone: '123-456-7893',
      gender: 'Male',
      age: '35',
     
    },
    {
      id: '5',
      name: 'Carol White',
      email: 'carol.white@example.com',
      phone: '123-456-7894',
      gender: 'Female',
      age: '29',
      
    }
  ]);

  const navigate = useNavigate();

  const handleDelete = (id) => {
    setEmployees(employees.filter(employee => employee.id !== id));
  };

  const handleUpdate = (id) => {
    navigate(`/employees/edit/${id}`);
  };

  return (
    <div>
      <h1>Employee List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id}>
              <td><Link to={`/employees/${employee.id}`}>{employee.name}</Link></td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              <td>{employee.gender}</td>
              <td>{employee.age}</td>
              
              <td>
                <button onClick={() => handleUpdate(employee.id)}>Update</button>
                <button onClick={() => handleDelete(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/employees/new">Add New Employee</Link>
    </div>
  );
};

export default EmployeeList;

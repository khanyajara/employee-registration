import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const SearchEmployee = () => {
  const [searchTerm, setSearchTerm] = useState('');
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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = (id)=>{

  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Search Employees</h1>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={handleSearch}
      />
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
          {filteredEmployees.map(employee => (
            <tr key={employee.id}>
              <td><Link to={`/employees/${employee.id}`}>{employee.name}</Link></td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              <td>{employee.gender}</td>
              <td>{employee.age}</td>
              
              <td>
                <Link to={`/employees/edit/${employee.id}`}><button>Update</button></Link>
                <button onClick={() => handleDelete(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchEmployee;
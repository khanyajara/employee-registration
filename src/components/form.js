import React, { useState } from 'react';

function Form() {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    gender: '',
    email: '',
    phone: '',
    position: '',
    id: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentEmployeeId, setCurrentEmployeeId] = useState('');

  const addEmployee = () => {
    if (employees.some(employee => employee.id === newEmployee.id)) {
      alert('Duplicate detected.');
      return;
    }
    if (!newEmployee.name || !newEmployee.email || !newEmployee.id) {
      alert('Fill in all required fields.');
      return;
    }
    setEmployees([...employees, newEmployee]);
    resetForm();
  };

  const resetForm = () => {
    setNewEmployee({
      name: '',
      gender: '',
      email: '',
      phone: '',
      position: '',
      id: ''
    });
    setIsEditing(false);
    setCurrentEmployeeId('');
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter(employee => employee.id !== id));
  };

  const editEmployee = (employee) => {
    setNewEmployee(employee);
    setIsEditing(true);
    setCurrentEmployeeId(employee.id);
  };

  const updateEmployee = () => {
    setEmployees(employees.map(employee => (employee.id === currentEmployeeId ? newEmployee : employee)));
    resetForm();
  };

  const handleSubmit = () => {
    if (isEditing) {
      updateEmployee();
    } else {
      addEmployee();
    }
  };

  return (
    <div className="App">
      
      
      <div>
        <h2>Employee Query</h2>
        <input
          type="text"
          placeholder="Search by ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        
      </div>
      
      <div className='add' >
        <h2>{isEditing ? 'Edit Employee' : 'Add Employee'}</h2>
        <input
          type="text"
          placeholder="Name"
          value={newEmployee.name}
          onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newEmployee.email}
          onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone number"
          value={newEmployee.phone}
          onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
        />
        <input
          type="text"
          placeholder="Gender"
          value={newEmployee.gender}
          onChange={(e) => setNewEmployee({ ...newEmployee, gender: e.target.value })}
        />
        <input
          type="text"
          placeholder="Position"
          value={newEmployee.position}
          onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
        />
        <input
          type="text"
          placeholder="ID"
          value={newEmployee.id}
          onChange={(e) => setNewEmployee({ ...newEmployee, id: e.target.value })}
        />
        <button onClick={handleSubmit}>{isEditing ? 'Update Employee' : 'Add Employee'}</button>
        {isEditing && <button onClick={resetForm}>Cancel</button>}
      </div>
      
      <div className='list'>
        <h2 >Employee List</h2>
        {employees
          .filter(employee => employee.id.includes(searchQuery))
          .map(employee => (
          
                <div key={employee.id} className='tablecontent' >
                  <table className='table'>
                      <th>
                          <tr>
                            <p>Name: {employee.name}</p>
                          </tr>
                      </th>
                      <th>
                          <tr>
                            <p>Email: {employee.email}</p>
                          </tr>
                      </th>
                      <th>
                          <tr>
                            <p>Gender: {employee.gender}</p>
                          </tr>
                      </th>
                      <th>
                          <tr>
                            <p>Phone: {employee.phone}</p>
                          </tr>
                      </th>
                      <th>
                          <tr>
                            <p>ID: {employee.id}</p>
                          </tr>
                      </th>
                      <th><tr><button onClick={() => deleteEmployee(employee.id)}>Delete</button></tr></th>
                      <th><tr><button onClick={() => editEmployee(employee)}>Edit</button></tr></th>
                  </table></div>
           
          ))}
      </div>
    </div>
  );
}

export default Form;

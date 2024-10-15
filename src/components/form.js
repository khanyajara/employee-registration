import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './form.css';

function Form() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState("");
  const [searchQuery, setSearchQuery] = useState('');
  const [showList, setShowList] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isOpen, setIsOpen] = useState({});
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    surname: '',
    age: '',
    idNumber: '',
    role: '',
    image: '',
    email: '' // Added email field
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentEmployeeId, setCurrentEmployeeId] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/getEmployees');
      setEmployees(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching employees:", error.message);
      setError("Error fetching employees.");
      setLoading(false);
    }
  };

  const handleShowList = () => {
    setShowList(true);
    setShowForm(false);
  };

  const handleShowForm = () => {
    setShowForm(true);
    setShowList(false);
  };

  const handleChange = (e) => {
    setNewEmployee({
      ...newEmployee,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const { name, surname, age, idNumber, role, email } = newEmployee;

    if (!name || !surname || !age || !idNumber || !role || !email) {
      setErrors("All fields are required.");
      return false;
    }

    setErrors("");
    return true;
  };

  const addEmployee = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.post('http://localhost:5000/api/addEmployee', newEmployee);
      setEmployees([...employees, { id: response.data.id, ...newEmployee }]);
      resetForm();
    } catch (error) {
      console.error("Error adding employee:", error.message);
      alert("Error adding employee.");
    }
  };

  const resetForm = () => {
    setNewEmployee({
      name: '',
      surname: '',
      age: '',
      idNumber: '',
      role: '',
      image: '',
      email: '' // Reset email
    });
    setIsEditing(false);
    setCurrentEmployeeId('');
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/deleteEmployee/${id}`);
      setEmployees(employees.filter(employee => employee.id !== id));
      resetForm();
    } catch (error) {
      console.error("Error deleting employee:", error.message);
      alert("Error deleting employee.");
    }
  };

  const editEmployee = (employee) => {
    setNewEmployee(employee);
    setIsEditing(true);
    setCurrentEmployeeId(employee.id);
    setShowForm(true);
    setShowList(false);
  };

  const updateEmployee = async () => {
    try {
      await axios.put(`http://localhost:5000/api/updateEmployee/${currentEmployeeId}`, newEmployee);
      setEmployees(employees.map(employee => (employee.id === currentEmployeeId ? newEmployee : employee)));
      resetForm();
      setShowForm(false);
      setShowList(true);
    } catch (error) {
      console.error("Error updating employee:", error.message);
      alert("Error updating employee.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (isEditing) {
        updateEmployee();
      } else {
        addEmployee();
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <div className='card'>
        <div className='showL'>
          <div className='column'>
            <button
              className={`btn2 ${showList ? 'active' : ''}`}
              onClick={handleShowList}
            >
              Show Employee List
            </button>
          </div>
          <div className='column'>
            <button
              className={`btn1 ${showForm ? 'active' : ''}`}
              onClick={handleShowForm}
            >
              Show Employee Form
            </button>
          </div>
        </div>
      </div>

      {showForm && (
        <div className='add'>
          <h2>{isEditing ? 'Edit Employee' : 'Add Employee'}</h2>
          <div className='adding'>
            <div className='card2'>
              <div className='form'>
                <input
                  type="text"
                  placeholder="Name"
                  value={newEmployee.name}
                  onChange={handleChange}
                  name="name"
                  className="input"
                />
                <input
                  type="text"
                  placeholder="Surname"
                  value={newEmployee.surname}
                  onChange={handleChange}
                  name="surname"
                  className="input"
                />
                <input
                  type="number"
                  placeholder="Age"
                  value={newEmployee.age}
                  onChange={handleChange}
                  name="age"
                  className="input"
                />
                <input
                  type="text"
                  placeholder="ID Number"
                  value={newEmployee.idNumber}
                  onChange={handleChange}
                  name="idNumber"
                  className="input"
                />
                <input
                  type="text"
                  placeholder="Role"
                  value={newEmployee.role}
                  onChange={handleChange}
                  name="role"
                  className="input"
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={newEmployee.image}
                  onChange={handleChange}
                  name="image"
                  className="input"
                  required
                />
                <input
                  type="email" // Email input
                  placeholder="Email"
                  value={newEmployee.email}
                  onChange={handleChange}
                  name="email"
                  className="input"
                />
              </div>
            </div>
            <div>
              {errors && <p style={{ color: 'red' }}>{errors}</p>}
              <button className='edit' onClick={handleSubmit}>
                {isEditing ? 'Update Employee' : 'Add Employee'}
              </button>
              {isEditing && <button className='delete' onClick={resetForm}>Cancel</button>}
            </div>
          </div>
        </div>
      )}

      {showList && (
        <div className='list'>
          <h2>Employee List</h2>
          <div className='search'>
            <input
              type="text"
              placeholder="Search by ID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <div className='list-container'>
            <div className='flexing'>
              {employees
                .filter(employee => employee.id.includes(searchQuery))
                .map(employee => (
                  <div key={employee.id} className='card1'>
                    <div className='sizeForCard'>
                      <div className="fakeimg">
                        <img src={employee.image} alt={employee.name} />
                      </div>
                      <div className="card_content">
                        <button className="another-btn" onClick={() => setIsOpen(prev => ({ ...prev, [employee.id]: !prev[employee.id] }))}>
                          {employee.name}
                        </button>
                        {isOpen[employee.id] && (
                          <ul className="dropdown-menu">
                            <div className="Info">
                              <p>Email: {employee.email}</p>
                              <p>Gender: {employee.gender}</p>
                              <p>Phone: {employee.phone}</p>
                              <p>ID: {employee.id}</p>
                            </div>
                          </ul>
                        )}
                        <button className='delete' onClick={() => deleteEmployee(employee.id)}>Delete</button>
                        <button className='edit' onClick={() => editEmployee(employee)}>Edit</button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Form;

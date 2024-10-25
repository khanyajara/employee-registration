import React, { useState, useEffect } from 'react';
import './form.css';

function Form() {
  const [employees, setEmployees] = useState(() => {
    const savedEmployees = localStorage.getItem('employees');
    return savedEmployees ? JSON.parse(savedEmployees) : [];
  });
  const [errors, setErrors] = useState("");
  const [searchQuery, setSearchQuery] = useState('');
  const [showList, setShowList] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    gender: '',
    email: '',
    phone: '',
    position: '',
    id: '',
    image: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentEmployeeId, setCurrentEmployeeId] = useState('');

  const saveToLocalStorage = (employees) => {
    localStorage.setItem('employees', JSON.stringify(employees));
  };

  const handleShowList = () => {
    setShowList(true);
    setShowForm(false);
    if (!employees.length) {
      alert('No employees yet...');
    }
  };

  const handleShowForm = () => {
    setShowForm(true);
    setShowList(false);
    if (!employees.length) {
      alert('No employees yet...');
    }
  };

  const handleChange = (e) => {
    setNewEmployee({
      ...newEmployee,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const { name, email, phone, id } = newEmployee;

    if (!name || !email || !phone || !id) {
      setErrors("All fields are required.");
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setErrors("Please enter a valid email address.");
      return false;
    }

    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(phone)) {
      setErrors("Please enter a valid phone number (10 digits).");
      return false;
    }

    const idPattern = /^\d{13}$/;
    if (!idPattern.test(id)) {
      setErrors("Please enter a valid ID (13 digits).");
      return false;
    }

    setErrors("");
    return true;
  };

  const addEmployee = () => {
    if (employees.some(employee => employee.id === newEmployee.id)) {
      alert('Duplicate ID detected.');
      return;
    }
    if (employees.some(employee => employee.email === newEmployee.email)) {
      alert('Duplicate email detected.');
      return;
    }
    if (!validateForm()) return;

    const updatedEmployees = [...employees, newEmployee];
    setEmployees(updatedEmployees);
    saveToLocalStorage(updatedEmployees);
    resetForm();
  };

  const resetForm = () => {
    setNewEmployee({
      name: '',
      gender: '',
      email: '',
      phone: '',
      position: '',
      id: '',
      image: ''
    });
    setIsEditing(false);
    setCurrentEmployeeId('');
  };

  const deleteEmployee = (id) => {
    const updatedEmployees = employees.filter(employee => employee.id !== id);
    setEmployees(updatedEmployees);
    saveToLocalStorage(updatedEmployees);
  };

  const editEmployee = (employee) => {
    setNewEmployee(employee);
    setIsEditing(true);
    setCurrentEmployeeId(employee.id);
    setShowForm(true);
    setShowList(false);
  };

  const updateEmployee = () => {
    const updatedEmployees = employees.map(employee => (employee.id === currentEmployeeId ? newEmployee : employee));
    setEmployees(updatedEmployees);
    saveToLocalStorage(updatedEmployees);
    resetForm();
    setShowForm(false);
    setShowList(true);
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

  return (
    <div className="App">
      <div className='card'>
        <div className='column'>
          <button
            className={`button--secondary ${showList ? 'button--active' : ''}`}
            onClick={handleShowList}
          >
            Show Employee List
          </button>
          <button
            className={`button--primary ${showForm ? 'button--active' : ''}`}
            onClick={handleShowForm}
          >
            Show Employee Form
          </button>
        </div>
      </div>

      {showForm && (
        <div className='form-container'>
          <h2>{isEditing ? 'Edit Employee' : 'Add Employee'}</h2>
          <form onSubmit={handleSubmit}>
            <div className='card-wrapper'>
              <div className='INPUT'>
                <div className='form-inputs'>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newEmployee.name}
                    onChange={handleChange}
                    className="input"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={newEmployee.email}
                    onChange={handleChange}
                    className="input"
                  />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={newEmployee.phone}
                    onChange={handleChange}
                    className="input"
                  />
                  <input
                    type="text"
                    name="id"
                    placeholder="ID"
                    value={newEmployee.id}
                    onChange={handleChange}
                    className="input"
                  />
                  <select
                    name="gender"
                    value={newEmployee.gender}
                    onChange={handleChange}
                    className="input"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <input
                    type="text"
                    name="position"
                    placeholder="Position"
                    value={newEmployee.position}
                    onChange={handleChange}
                    className="input"
                  />
                  <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={newEmployee.image}
                    onChange={handleChange}
                    className="input"
                  />
                </div>
                {errors && <p className="error">{errors}</p>}
                <div className='form-buttons'>
                  <button type="submit" className={`button--${isEditing ? 'edit' : 'primary'}`}>
                    {isEditing ? 'Update Employee' : 'Add Employee'}
                  </button>
                  {isEditing && (
                    <button type="button" className="button--delete" onClick={() => deleteEmployee(currentEmployeeId)}>
                      Delete Employee
                    </button>
                  )}
                  <button type="button" className="button--another" onClick={resetForm}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}

      {showList && (
        <div className='employee-list'>
          <input
            type="text"
            placeholder="Search by ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <div className='grid'>
            {employees.filter(employee => employee.id.includes(searchQuery)).map((employee, index) => (
              <div key={index} className='grid-item'>
                <div className='card'>
                  <img src={employee.image || 'placeholder-image-url'} alt={employee.name} className='card__image' />
                  <div className='card__content'>
                    <h3 className='card__title'>{employee.name}</h3>
                    <p className='card__description'>Email: {employee.email}</p>
                    <p className='card__description'>Phone: {employee.phone}</p>
                    <p className='card__description'>ID no: {employee.id}</p>
                    <p className='card__description'>Position: {employee.position}</p>
                    <p className='card__description'>Gender: {employee.gender}</p>
                    <button className='button--edit' onClick={() => editEmployee(employee)}>Edit</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Form;

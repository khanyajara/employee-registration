import React, { useState } from 'react';
import './form.css';

function Form() {
  const [employees, setEmployees] = useState([]);
  const [errors, setErrors] = useState("");
  const [searchQuery, setSearchQuery] = useState('');
  const [showList, setShowList] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isOpen,setIsOpen] = useState(false)
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
      id: '',
      image: ''
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
    setShowForm(true)
    setShowList(false)
  };

  const updateEmployee = () => {
    setEmployees(employees.map(employee => (employee.id === currentEmployeeId ? newEmployee : employee)));
    resetForm();
    setShowForm(false)
    setShowList(true)
  };
  const MyDropdown = () => {
    setIsOpen(!isOpen);
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
          <div className='card2'>
            <div className='form'>
              <div className='columm'>
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    value={newEmployee.name}
                    onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                    className="input"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={newEmployee.email}
                    onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                    className="input"
                  />
                  <input
                    type="text"
                    placeholder="Phone number"
                    value={newEmployee.phone}
                    onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
                    className="input"
                  /><br/>
                </div><div>
                  
                  <select id="Gender" name="Gender" className="input" value={newEmployee.gender} onChange={(e) => setNewEmployee({...newEmployee, gender: e.target.value })}>
                    <option value="Select Gender">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Position"
                    value={newEmployee.position}
                    onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
                    className="input"
                  />
                  <input
                    type="text"
                    placeholder="ID"
                    value={newEmployee.id}
                    onChange={(e) => setNewEmployee({ ...newEmployee, id: e.target.value })}
                    className="input"
                  />
                  <input
                    type="text"
                    placeholder='Image URL'
                    value={newEmployee.image}
                    onChange={(e) => setNewEmployee({...newEmployee, image: e.target.value})}
                    className="input"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {errors && <p style={{ color: 'red' }}>{errors}</p>}

          <button className='edit' onClick={handleSubmit}>
            {isEditing ? 'Update Employee' : 'Add Employee'}
          </button>
          {isEditing && <button className='delete' onClick={resetForm}>Cancel</button>}
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
          </div><div  className='list-container'>

            
            <div className='flexing'>
            
              {employees
                .filter(employee => employee.id.includes(searchQuery))
                .map(employee => (
                  <div key={employee.id} className='card1'>
                    <div className='sizeForCard'>
                      <div className="fakeimg"><img src={employee.image} alt={employee.name}/></div>
                        <div className="card_content">
                          <div className="dropdown">
                          <button className="another-btn" onclick={MyDropdown}>{employee.name}</button>
            
                           <ul className="dropdown-menu" >
                             <div className="Info">
                               <p>Email: {employee.email}</p>
                               <p>Gender: {employee.gender}</p>
                               <p>Phone: {employee.phone}</p>
                               <p>ID: {employee.id}</p>
                             </div>
                           </ul>
            
                          </div>
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

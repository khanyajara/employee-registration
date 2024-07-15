import React, { useState } from 'react';

function Form() {
  const [employees, setEmployees] = useState([]);
  const [errors, setErrors] = useState("");
  const [showError, setShowError] = useState("")
  const [searchQuery, setSearchQuery] = useState('');
  const [showlist,setShowList] =useState ('') 
  const [showForm,setShowForm] =useState ('')
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    gender: '',
    email: '',
    phone: '',
    position: '',
    id: ''
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentEmployeeId, setCurrentEmployeeId] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const { name, email, phone } = newEmployee;

    if (!name || !email || !phone) {
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
 
    setErrors("");
    return true;
  };

  const addEmployee = () => {
    if (employees.some(employee => employee.id === newEmployee.id)) {
      alert('Duplicate detected.');
      return;
    }
    if (employees.some(employee => employee.email === newEmployee.email)) {
      alert('Duplicate detected.');
      return;
    }
    if(!validateForm()) return;
    if(employees.some(employee=>employee.id===newEmployee.id)){
      alert('Congrats you might be a clone.');
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

  const handleshowlist = () =>{
     setShowList(true);
     setShowForm(false);
      }


  const handleShowForm = () => {
    setShowForm (true);
    setShowList(false);
  }
  return (
    <div className="App">
     

  
            <div  className='showL'>
  
                <button  onClick={handleShowForm} >show employee form</button>
                <button  onClick={handleshowlist} >show employee list</button>
            </div>


      {showForm&& (
      <div className='add'>
          

        <h2>{isEditing ? 'Edit Employee' : 'Add Employee'}</h2>
        <div className='form'>
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
        </div>

        {errors && <p style={{ color: 'red' }}>{errors}</p>}

        <div></div>
        <button  className='edit' onClick={handleSubmit}>{isEditing ? 'Update Employee' : 'Add Employee'}</button>
        {isEditing && <button className='delete' onClick={resetForm}>Cancel</button>}
      </div>)} {showlist && (
      <div>
        <h2>Employee Query</h2>
         <div>
         

         </div>


        <input
          type="text"
          placeholder="Search by ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>)}
      {showlist&&(
      <div className='list'>
        <h2>Employee List</h2>
        {employees
          .filter(employee => employee.id.includes(searchQuery))
          .map(employee => (
            <div key={employee.id} className='tablecontent'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Phone</th>
                    <th>ID</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='detail' >{employee.name}</td>
                    <td className='detail'>{employee.email}</td>
                    <td className='detail'>{employee.gender}</td>
                    <td className='detail'>{employee.phone}</td>
                    <td className='detail'>{employee.id}</td>
                    <td>
                      <td ><button className='delete' onClick={() => deleteEmployee(employee.id)}>Delete</button></td>
                      <td ><button  className='edit' onClick={() => editEmployee(employee)}>Edit</button></td>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
      </div>)}
    </div> 
  );
}

export default Form;

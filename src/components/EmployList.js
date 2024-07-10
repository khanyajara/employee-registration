import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';




const EmployeeList = ( props) => {
  
 
  //const navigate = useNavigate();

  const deleteEmp = ((id)=>{
    console.log(id);
    props.deleteEmployee(id)

  })

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);}

    const [employee, setEmployee] = useState(null);
    const { id } = useParams();
    const [formState, setFormState] = useState({ name: '', email: '', phone: '' });

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


   
  return (
    <div className='list2'  >
      <h2 className='head'>Employee List</h2>
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

            {props.employees.map((employee)=>(
                <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.phone}</td>
                <td>{employee.gender}</td>
                <td>{employee.age}</td>
                
                <td>
                  <button onClick={ handleChange}>Update</button>
                  <button   onClick={()=> deleteEmp(employee.id)}>Delete</button>
                </td>
              </tr>
            ))}
          
        </tbody>
      </table>
      
    </div>
  );
};

export default EmployeeList;
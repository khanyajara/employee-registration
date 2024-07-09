import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const EmployeeList = ( props) => {
  

  //const navigate = useNavigate();

  const deleteEmp = ((id)=>{
    console.log(id);
    props.deleteEmployee(id)

  })

  
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

            {props.employees.map((employee)=>(
                <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.phone}</td>
                <td>{employee.gender}</td>
                <td>{employee.age}</td>
                
                <td>
                  <button >Update</button>
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

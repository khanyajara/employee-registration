import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


const EmployeeForm = (props) => {

 
  
  const [isEditing, setIsEditing] = useState(false);

  const [name,setName] =useState ()
  const [email,setEmail] = useState ()
  const [phone,setPhone] = useState ()
  const [gender,setGender] = useState ()
  const [age,setAge] = useState ()


  const handleSubmit = (e) => {
    props.add(name,email,phone,gender,age)
   
  };

  return (
   <div></div>

  );
};

export default EmployeeForm;
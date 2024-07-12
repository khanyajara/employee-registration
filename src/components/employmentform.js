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

  const ContactForm = () => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      cellnumber: ""
    });
  
    const [error, setError] = useState("");
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };
  
    const validateForm = () => {
      const { name, email, cellnumber } = formData;
  
      if (!name || !email || !cellnumber) {
        setError("Please fill out all required fields");
        return false;
      }
  
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        setError("Please enter a valid email address");
        return false;
      }
  
      const phonePattern = /^\d{10}$/;
      if (!phonePattern.test(cellnumber)) {
        setError("Please enter a valid cell number (10 digits)");
        return false;
      }
  
      setError("");
      return true;
    };
  }  
  
  

  return (
   <div></div>

  );
};

export default EmployeeForm;
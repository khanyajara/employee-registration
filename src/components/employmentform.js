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
    <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input type="text" name="name"    onChange={(event)=>setName(event.target.value)}/>
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name="email"   onChange={(event)=>setEmail(event.target.value)}/>
          </div>
          <div>
            <label>Phone Number:</label>
            <input type="text" name="phone" onChange={(event)=>setPhone(event.target.value)} />
          </div>
          <div>
            <label>Gender:</label>
            <select name="gender"onChange={(event)=>setGender(event.target.value)} >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label>Age:</label>
            <input type="number" name="age" onChange={(event)=>setAge(event.target.value)} />
          </div>
         
           </form>
           <button type="submit" onClick={handleSubmit}>{isEditing ? 'Update' : 'Register'} Employee</button>
    </div>


  );
};

export default EmployeeForm;
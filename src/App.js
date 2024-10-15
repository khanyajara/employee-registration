import {React , useState} from 'react';
import { BrowserRouter as Router, Route, Routes,Link, useNavigate } from 'react-router-dom';
import EmployeeForm from './components/employmentform';
import SearchEmployee from './components/SearchEmployee';
import EmployeeList from './components/EmployList';
import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Form from './components/form';
import '../src/App.css';


const App = () => {
  const { id } = useParams();
  const navigate = useNavigate 
  const [formState, setFormState] = useState({ name: '', email: '', phone: '' });
   const [employees, setEmployees] = useState([
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      gender: 'Male',
      age: '30',
      
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '123-456-7891',
      gender: 'Female',
      age: '28',
      
    },
    {
      id: '3',
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      phone: '123-456-7892',
      gender: 'Female',
      age: '25',
      
    },
    {
      id: '4',
      name: 'Bob Brown',
      email: 'bob.brown@example.com',
      phone: '123-456-7893',
      gender: 'Male',
      age: '15',
     
    },
    
  ]);

  
  const handleTabChange = (tab) => {
    navigate(`/${tab}`); // Navigate to the specified tab
  };




 
  
  const [searchId, setSearchId] = useState('');
  const [employee, setEmployee] = useState(null);

  const handleSearch = () => {
 
  };
  const updateEmployee = (updatedEmployee) => {
    setEmployees(employees.map(employee =>
      employee.id === updatedEmployee.id ? updatedEmployee : employee
    ));
  };

  const  deleteEmployee  =  ((id)=>{
    setEmployees(employees.filter(employee => employee.id !== id));
  })

 const [filteredEmployees,setFilteredEmployees] = useState(employees);


const handleupdate = (updatedEmployees) =>{

  setFilteredEmployees (updatedEmployees)
}

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
 
   <div className='container'>
     <h1>Employee Registration form</h1>
       <div className="container">
   
         <div className='form'>
          
         </div>
         <div className='details '>
           <Form employees={employees}  deleteEmployee={deleteEmployee} handleUpdate={handleUpdate}  />
         </div>
         

       </div>

       <div>
        
       </div>
   </div>
 
    
  );
}

export default App;
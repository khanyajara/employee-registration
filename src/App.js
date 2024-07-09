import {React , useState} from 'react';
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom';
import EmployeeDetails from './components/EmployeeDetails';
import EmployeeForm from './components/employmentform';
import SearchEmployee from './components/SearchEmployee';
import EmployeeList from './components/EmployList';
import './App.css'

const App = () => {

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



  const add =  ((name, email, phone, gender, age, )=>{

    let newEmploye = {
      name:name ,
      email:email,
      phone:phone,
      gender:gender,
      age:age,
    }

    

    setEmployees((employees)=> 
      [...employees, newEmploye ]
    )

    console.log(newEmploye)
    console.log(employees);
  })


  const  deleteEmployee  =  ((id)=>{
    setEmployees(employees.filter(employee => employee.id !== id));
  })

  



  return (
    
      <div className="container">
        <EmployeeList  employees={employees}  deleteEmployee={deleteEmployee}/>
        <EmployeeForm   add = {add}/>
        
      </div>
    
  );
}

export default App;
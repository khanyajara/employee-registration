import {React , useState} from 'react';
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom';
import EmployeeDetails from './components/EmployeeDetails';
import EmployeeForm from './components/employmentform';
import SearchEmployee from './components/SearchEmployee';
import EmployeeList from './components/EmployList';
import { useParams } from 'react-router-dom';
import '../src/App.css';


const App = () => {
  const { id } = useParams();
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
  
  const [searchId, setSearchId] = useState('');
  const [employee, setEmployee] = useState(null);

  const handleSearch = () => {
    // Fetch employee by ID
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
     <div className='Search'>
       <SearchEmployee handleSearch={handleSearch} />
     </div>
       <div className='list'>
         <EmployeeList  employees={employees}  deleteEmployee={deleteEmployee} handleUpdate={handleUpdate}  />
       </div>
       <div className='form'>
         <EmployeeForm   add = {add}/>
       </div>
       <div className='details '>
         <EmployeeDetails />
       </div>
      
   
   
     </div>
 </div>
    
  );
}

export default App;
import { useEffect , useState } from "react";
import { useParams, Link } from "react-router-dom";

const EmployeeDetails =()=> {
   
    const {id} = useParams ();
    const [employee,setEmployee] =
    useState(null);

    useEffect (()=>{
        //fetch employee details by ID
    })

    if (!employee)return<div>loading...</div>


    return (

        <div>
          <h2>{employee.name}</h2>
          <p>Email:{employee.email}</p>
          <p>Phone:{employee.phone}</p>
          <p>Age:{employee.age}</p>

          <Link to ={'/employee/edit/$ {employee.id}'}>Edit</Link>

        </div>
    );
    



};


export default EmployeeDetails;
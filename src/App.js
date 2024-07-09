import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeeDetails from './components/EmployeeDetails';
import EmployeeForm from './components/employmentform';
import SearchEmployee from './components/SearchEmployee';
import EmployeeList from './components/EmployList';
import './App.css'

const App = () => {
  return (
    <Router>
      <div className="container">
        <Routes>
          
         <Route path="/employees/new" element={<EmployeeForm />} />
          <Route path="/employees/edit/:id" element={<EmployeeForm />} />
          <Route path="/employees/:id" element={<EmployeeDetails />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/search" element={<SearchEmployee />} />
          <Route path="/" element={<EmployeeList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
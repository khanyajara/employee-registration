import React, { useState } from 'react';

const SearchEmployee = (props) => {
  const [searchId, setSearchId] = useState('');
  const [employee, setEmployee] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/employees/${searchId}`);
      const data = await response.json();
      setEmployee(data);
    } catch (error) {
      console.error('Error fetching employee:', error);
    }
  }; 
   
  return (
    <div className='searching'>
      <h1>Search Employee</h1>
      <input
        type="text"
        placeholder="Enter Employee ID"
        value={searchId}
        onChange={(e)=> setSearchId(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {employee && (
        <div>
          <h2>{employee.name}</h2>
          <p>Email: {employee.email}</p>
          <p>Phone: {employee.phone}</p>
        </div>
      )}
    </div>
  );
};

export default SearchEmployee; 
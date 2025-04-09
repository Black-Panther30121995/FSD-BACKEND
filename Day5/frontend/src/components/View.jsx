import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './View.css' // Import the CSS file

const View = () => {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    viewdata();
  }, [])
  
  const viewdata = async () => {
    const res = await axios.get('https://fsd-backend-5.onrender.com/users');
    console.log(res);
    setUsers(res.data);
  }
  
  return (
    <div className="view-container">
      <h1 className="view-title">
        Registered Users List
      </h1>
      <table className="users-table">
        <thead>
          <tr className="table-header">
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((user) => (
              <tr key={user.id} className="table-row">
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.age}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default View
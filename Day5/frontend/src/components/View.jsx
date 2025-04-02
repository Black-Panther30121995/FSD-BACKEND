import React, { useEffect, useState } from 'react'
import axios from 'axios'

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
    <div 
      style={{ 
        minHeight: "100vh", 
        backgroundColor: "#f0e6f0", // Light purple background
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px"
      }}
    >
      <h1 
        style={{ 
          color: "#6a0dad", // Dark purple heading
          marginBottom: "30px"
        }}
      >
        Registered Users List
      </h1>
      <table 
        style={{ 
          border: '1px solid #6a0dad',
          backgroundColor: '#fff', // White background for table
          width: '100%',
          maxWidth: "800px",
          textAlign: 'center',
          borderCollapse: 'collapse',
          boxShadow: "0 0 10px rgba(106, 13, 173, 0.2)"
        }}
      >
        <thead>
          <tr 
            style={{ 
              border: '3px solid #6a0dad',
              backgroundColor: '#6a0dad', // Purple header background
              color: 'white'
            }}
          >
            <th style={{ padding: "10px" }}>ID</th>
            <th style={{ padding: "10px" }}>Name</th>
            <th style={{ padding: "10px" }}>Age</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((user) => (
              <tr 
                key={user.id}
                style={{ 
                  borderBottom: '1px solid #6a0dad',
                }}
              >
                <td style={{ padding: "10px" }}>{user.id}</td>
                <td style={{ padding: "10px" }}>{user.name}</td>
                <td style={{ padding: "10px" }}>{user.age}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default View
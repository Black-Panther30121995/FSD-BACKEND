import React from 'react'
import axios from 'axios'

const Update = () => {
  const handleupdate = async (e) => {
    e.preventDefault()
    const id = e.target.id.value;
    const name = e.target.name.value;
    const age = e.target.age.value;
    const data = { name, age }
    await axios.put(`http://localhost:9000/users/${id}`, data);
    alert("Success")
  }
  
  return (
    <div 
      style={{ 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f0e6f0" // Light purple background
      }}
    >
      <h2 
        style={{ 
          color: "#6a0dad", // Dark purple heading
          marginBottom: "30px",
          textAlign: "center"
        }}
      >
        Update User
      </h2>
      <form 
        onSubmit={handleupdate}
        style={{ 
          width: "100%",
          maxWidth: "400px",
          padding: "30px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(106, 13, 173, 0.2)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px"
        }}
      >
        <div 
          style={{ 
            display: "flex", 
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            width: "100%"
          }}
        >
          <label 
            style={{ 
              color: "#6a0dad",
              margin: 0,
              whiteSpace: "nowrap"
            }}
          >
            ID:
          </label>
          <input 
            type="text" 
            name='id' 
            placeholder='Enter User ID'
            style={{
              borderColor: "#6a0dad",
              width: "200px",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #6a0dad"
            }}
          />
        </div>
        <div 
          style={{ 
            display: "flex", 
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            width: "100%"
          }}
        >
          <label 
            style={{ 
              color: "#6a0dad",
              margin: 0,
              whiteSpace: "nowrap"
            }}
          >
            Name:
          </label>
          <input 
            type="text" 
            name='name' 
            placeholder='Enter Name'
            style={{
              borderColor: "#6a0dad",
              width: "200px",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #6a0dad"
            }}
          />
        </div>
        <div 
          style={{ 
            display: "flex", 
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            width: "100%"
          }}
        >
          <label 
            style={{ 
              color: "#6a0dad",
              margin: 0,
              whiteSpace: "nowrap"
            }}
          >
            Age:
          </label>
          <input 
            type="text" 
            name='age' 
            placeholder='Enter Age'
            style={{
              borderColor: "#6a0dad",
              width: "200px",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #6a0dad"
            }}
          />
        </div>
        <button 
          type='submit'
          style={{
            backgroundColor: "#6a0dad",
            borderColor: "#6a0dad",
            color: "white",
            width: "200px",
            padding: "8px",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer"
          }}
        >
          Update
        </button>
      </form>
    </div>
  )
}

export default Update
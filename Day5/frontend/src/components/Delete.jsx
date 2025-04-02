import React from 'react'
import axios from 'axios'

const Delete = () => {
  const handleDelete = async (e) => {
    e.preventDefault()
    const id = e.target.id.value;
    await axios.delete(`http://localhost:9000/users/${id}`)
    alert('Product deleted successfully')
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
        Delete User
      </h2>
      <form 
        onSubmit={handleDelete}
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
        <input 
          type="text" 
          placeholder='Enter User ID' 
          name='id'
          style={{
            borderColor: "#6a0dad",
            width: "200px",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #6a0dad"
          }}
        />
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
          Delete
        </button>
      </form>
    </div>
  )
}

export default Delete
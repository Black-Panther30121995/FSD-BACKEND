import React from 'react'
import axios from 'axios'
import './Delete.css' // Import the CSS file

const Delete = () => {
  const handleDelete = async (e) => {
    e.preventDefault()
    const id = e.target.id.value;
    await axios.delete(`https://fsd-backend-5.onrender.com/users/${id}`)
    alert('User deleted successfully')
  }
  
  return (
    <div className="delete-container">
      <h2 className="delete-title" style={{textAlign:"center"}}>Delete User</h2>
      <form onSubmit={handleDelete} className="delete-form">
        <input 
          type="text" 
          placeholder='Enter User ID' 
          name='id'
          className="delete-input"
        />
        <button 
          type='submit'
          className="delete-button"
        >
          Delete
        </button>
      </form>
    </div>
  )
}

export default Delete
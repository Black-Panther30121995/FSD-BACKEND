import React from 'react'
import axios from 'axios'
import './Update.css' // Import the CSS file

const Update = () => {
  const handleupdate = async (e) => {
    e.preventDefault()
    const id = e.target.id.value;
    const name = e.target.name.value;
    const age = e.target.age.value;
    const data = { name, age }
    await axios.put(`https://fsd-backend-5.onrender.com/users/${id}`, data);
    alert("Success")
  }
  
  return (
    <div className="update-container">
      <h2 className="update-title">
        Update User
      </h2>
      <form onSubmit={handleupdate} className="update-form">
        <div className="input-group">
          <label className="input-label">
            ID:
          </label>
          <input 
            type="text" 
            name='id' 
            placeholder='Enter User ID'
            className="update-input"
          />
        </div>
        <div className="input-group">
          <label className="input-label">
            Name:
          </label>
          <input 
            type="text" 
            name='name' 
            placeholder='Enter Name'
            className="update-input"
          />
        </div>
        <div className="input-group">
          <label className="input-label">
            Age:
          </label>
          <input 
            type="text" 
            name='age' 
            placeholder='Enter Age'
            className="update-input"
          />
        </div>
        <button type='submit' className="update-button">
          Update
        </button>
      </form>
    </div>
  )
}

export default Update
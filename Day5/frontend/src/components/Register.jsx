import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        const user = { name, age };
        try {
            await axios.post("http://localhost:9000/users", user);
            setMessage("User registered successfully!!");
            setName('');
            setAge('');
        } catch (error) {
            setMessage("Registration failed. Please try again.");
        }
    };

    return (
        <div 
            className="container my-3" 
            style={{ 
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                minHeight: "100vh",
                backgroundColor: "#f0e6f0"
            }}
        >
            <h2 
                className="text-center mb-4" 
                style={{ color: "#6a0dad" }}
            >
                User Registration
            </h2>
            <form 
                onSubmit={handleRegister} 
                className="d-flex flex-column align-items-center"
                style={{ 
                    width: "100%",
                    maxWidth: "400px",
                    padding: "30px",
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0 0 10px rgba(106, 13, 173, 0.2)"
                }}
            >
                <div 
                    className="w-100" 
                    style={{ 
                        display: "flex", 
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                        marginBottom: "30px"
                    }}
                >
                    <label 
                        className="form-label" 
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
                        className="form-control"
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={{
                            borderColor: "#6a0dad",
                            width: "200px"
                        }}
                    />
                </div>
                <div 
                    className="w-100" 
                    style={{ 
                        display: "flex", 
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                        marginBottom: "30px"
                    }}
                >
                    <label 
                        className="form-label" 
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
                        className="form-control"
                        value={age} 
                        onChange={(e) => setAge(e.target.value)}
                        required
                        style={{
                            borderColor: "#6a0dad",
                            width: "200px"
                        }}
                    />
                </div>
                <div 
                    style={{ 
                        display: "flex", 
                        justifyContent: "center",
                        width: "100%",
                        marginTop: "20px"
                    }}
                >
                    <button 
                        type="submit" 
                        className="btn"
                        style={{
                            backgroundColor: "#6a0dad",
                            borderColor: "#6a0dad",
                            color: "white",
                            width: "200px"
                        }}
                    >
                        Register
                    </button>
                </div>
            </form>
            {message && (
                <p 
                    className="text-center mt-3" 
                    style={{ 
                        color: message.includes("failed") ? "#dc3545" : "#6a0dad",
                        fontWeight: "bold"
                    }}
                >
                    {message}
                </p>
            )}
        </div>
    );
};

export default RegisterForm;
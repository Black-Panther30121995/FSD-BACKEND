import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import AddBook from './components/AddBook';
import SearchBook from './components/SearchBook';
import UpdateBook from './components/UpdateBook';
import DeleteBook from './components/DeleteBook';
import ViewBook from './components/ViewBook';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <nav className="navbar">
        <h1 className="navbar-logo">Book App</h1>
        <div className="navbar-links">
          <Link to="/search" className="navbar-link">Search Book</Link>
          <Link to="/view" className="navbar-link">View Books</Link>
          <Link to="/add" className="navbar-link">Add Book</Link>
          <Link to="/update" className="navbar-link">Update Book</Link>
          <Link to="/delete" className="navbar-link">Delete Book</Link>
        </div>
      </nav>
      <img
        style={{ display: "block", margin: "20px auto", maxWidth: "100%", height: "auto" }}
        src="https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg?semt=ais_hybrid&w=740"
        alt="Books"
      />

      <Routes>
        <Route path="/search" element={<SearchBook />} />
        <Route path="/view" element={<ViewBook />} />
        <Route path="/add" element={<AddBook />} />
        <Route path="/update" element={<UpdateBook />} />
        <Route path="/delete" element={<DeleteBook />} />
      </Routes>
    </div>
  );
};

export default App;
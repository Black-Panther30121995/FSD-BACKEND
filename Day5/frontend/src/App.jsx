import React from 'react';
import Register from './components/Register';
import View from './components/View';
import Delete from './components/Delete';
import Update from './components/Update';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <h1 className="app-title">User Registration System</h1>
      <div className="row-container">
        <div className="column">
          <Register />
        </div>
        <div className="column">
          <View />
        </div>
      </div>
      <div className="row-container">
        <div className="column">
          <Update />
        </div>
        <div className="column">
          <Delete />
        </div>
      </div>
      Created by Yachna..
    </div>
  );
};

export default App;
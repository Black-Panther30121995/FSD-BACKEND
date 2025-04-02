import React from 'react'
import Register from './components/Register'
import View from './components/View'
import Delete from './components/Delete'
import Update from './components/Update'

const App = () => {
  return (
    <div>
  <h1 style={{backgroundColor:'purple',alignItems:'center',textAlign:'center',color:'white'}}>User Registrstion System</h1>
      <Register/>
      <View/>
      <Update/>
      <Delete/>
    </div>
  )
}

export default App

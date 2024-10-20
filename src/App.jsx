import React from 'react'
import Nav from './Nav'
import Login from './login/Login'
import Register from './login/Register'
import { Route, Routes } from 'react-router-dom'
import Admin from './screens/Admin'
import User from './screens/User'
import Edit from './edit/Edit'
import Create from './create/Create'
const App = () => {
  return (
    <div>
         
          <Routes>
            <Route element={<Login/>} path='/'/>
            <Route element={<Login/>} path='/login'/>
            <Route element={<Register/>} path='/register' />
            <Route element={<Admin/>} path='/admin'/>
            <Route element={<User/>} path='/user' />
            <Route element={<Create/>} path='/create' />
            <Route element={<Edit/>} path='/edit/:id' />
          </Routes>
     
    </div>
  )
}

export default App

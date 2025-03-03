import { useState } from 'react'
import { BrowserRouter, Router, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Nav from './components/Navbar';
import Login from './views/login';
import Register from './views/register';
import Users from './views/users/users';

function App() {
  return (
    <BrowserRouter>
      <Nav>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/users" element={<Users />}></Route>
        </Routes>
      </Nav>
    </BrowserRouter>
  )
}

export default App

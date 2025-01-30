import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminMain from './pages/AdminMain'
import UserHome from './pages/UserHome'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="admin_main" element={<AdminMain />} />
        <Route path="user_home" element={<UserHome />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
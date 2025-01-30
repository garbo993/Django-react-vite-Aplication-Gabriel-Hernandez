import React, { useState } from 'react'
import api from '../api/axios'

function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const response = await api.post('/register', { username, password })
      console.log('Registration successful:', response.data)
      window.alert('Registration successful!')
    } catch (error) {
      window.alert('Error registering. Please try again.')
      console.error('Error registering:', error)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold text-center">Register</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
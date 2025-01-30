import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

function UserHome() {
  const [data, setData] = useState({})
  const [clicks1, setClicks1] = useState(0)
  const [clicks2, setClicks2] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/api/home')
        setData(response.data)
      } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message)
      }
    }

    fetchData()
  }, [])

  const handleLogout = async () => {
    try {
      let url = '/api/logout'
      const params = []
      if (clicks1 > 0) params.push(`click1=${clicks1}`)
      if (clicks2 > 0) params.push(`click2=${clicks2}`)
      if (params.length > 0) url += `?${params.join('&')}`
      
      await api.post(url) // Ejecutar la ruta api/logout en la API de Django con los parámetros de clics si existen
      localStorage.removeItem('token')
      navigate('/login')
    } catch (error) {
      console.error('Error logging out:', error.response ? error.response.data : error.message)
    }
  }

  const handleClick1 = () => {
    setClicks1(clicks1 + 1)
  }

  const handleClick2 = () => {
    setClicks2(clicks2 + 1)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex bg-white rounded shadow-md relative">
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 px-4 py-2 font-bold text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-200"
        >
          Logout
        </button>
        {data.image && (
          <img
            src={data.image}
            alt="Description"
            className="w-1/3 h-auto object-cover rounded-l"
          />
        )}
        <div className="w-2/3 p-8 space-y-6">
          <h1 className="text-2xl font-bold text-center">User Home Page</h1>
          <div className="text-center">
            <h2 className="text-xl font-semibold">{data.title}</h2>
            <p className="mt-4">{data.description}</p>
            <div className="flex justify-center space-x-4 mt-4">
              <button
                onClick={handleClick1}
                className="px-4 py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
              >
                Button 1
              </button>
              <button
                onClick={handleClick2}
                className="px-4 py-2 font-bold text-white bg-green-600 rounded hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-200"
              >
                Button 2
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserHome
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bar, Pie } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import api from '../api/axios'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

function AdminMain() {
  const [data, setData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/api/home')
        const filteredData = response.data.map(user => {
          const { email, ...rest } = user
          return rest
        })
        setData(filteredData)
      } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message)
      }
    }

    fetchData()
  }, [])

  const handleLogout = async () => {
    try {
      await api.post('/api/logout') // Ejecutar la ruta api/logout en la API de Django
      localStorage.removeItem('token')
      navigate('/login')
    } catch (error) {
      console.error('Error logging out:', error.response ? error.response.data : error.message)
    }
  }

  const chartData = {
    labels: data.map(user => user.username),
    datasets: [
      {
        label: 'Session Time (minutes)',
        data: data.map(user => user.timeSession ? user.timeSession : 0),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  }

  const chartOptions = {
    indexAxis: 'y', // Cambiar la orientación de la gráfica a horizontal
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  }

  const totalClicks1 = data.reduce((sum, user) => sum + (user.click1 || 0), 0)
  const totalClicks2 = data.reduce((sum, user) => sum + (user.click2 || 0), 0)

  const pieData = {
    labels: ['Clicks 1', 'Clicks 2'],
    datasets: [
      {
        data: [totalClicks1, totalClicks2],
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-8 space-y-6 bg-white rounded shadow-md relative">
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 px-4 py-2 font-bold text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-200"
        >
          Logout
        </button>
        <h1 className="text-2xl font-bold text-center">Admin Main Page</h1>
        <div className="flex space-x-4">
          <div className="w-1/2">
            <Bar data={chartData} options={chartOptions} />
          </div>
          <div className="w-1/2">
            <Pie data={pieData} />
          </div>
        </div>
        <table className="min-w-full bg-white mt-6">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Username</th>
              <th className="py-2 px-4 border-b">Last Login</th>
              <th className="py-2 px-4 border-b">Session Time</th>
              <th className="py-2 px-4 border-b"> Boton Clicks 1</th>
              <th className="py-2 px-4 border-b"> Boton Clicks 2</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{user.username}</td>
                <td className="py-2 px-4 border-b">{user.last_login}</td>
                <td className="py-2 px-4 border-b">{user.timeSession}</td>
                <td className="py-2 px-4 border-b">{user.click1}</td>
                <td className="py-2 px-4 border-b">{user.click2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminMain
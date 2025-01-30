import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Ajusta la URL base a tu backend
})

// Interceptor para agregar el token a las peticiones
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Token ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default api
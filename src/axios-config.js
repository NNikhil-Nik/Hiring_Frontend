// axios-config.js
import axios from "axios"
import { URL } from "./url"

const instance = axios.create({
  URL,
})

// Add an Axios interceptor to set the Authorization header
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")

    if (token) {
      return {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        },
      }
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default instance

/* eslint-disable react/prop-types */

import axios from "../axios-config" // Import the Axios instance
import { createContext, useEffect, useState } from "react"
import { URL } from "../url"

export const UserContext = createContext({})

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null)

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token") // Get the JWT token from local storage
      if (token) {
        const res = await axios.get(URL + "/api/auth/refetch", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`, // Pass the JWT token in the request headers
          },
        })
        setUser(res.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

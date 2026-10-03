// src/AuthContext.jsx
import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)
const TOKEN_KEY = 'final-project:admin-token'

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY))

  function login(newToken) {
    localStorage.setItem(TOKEN_KEY, newToken)
    setToken(newToken)
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY)
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ isAdmin: Boolean(token), token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
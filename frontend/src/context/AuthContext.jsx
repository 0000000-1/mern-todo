import { useState, useContext, createContext } from "react";
import axios from '../lib/axios.js'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user')
        return savedUser ? JSON.parse(savedUser) : null
    })
    const [token, setToken] = useState(null)

    const register = async (username, email, password) => {
        const res = await axios.post('/auth/signup', { username, email, password })
        const data = res.data

        localStorage.setItem('token', res.data.token)

        setToken(res.data.token)
        setUser(res.data.user)
        return res

    }

    const login = async (email, password) => {
        const res = await axios.post('/auth/login', { email, password })
        const data = res.data

        localStorage.setItem('token', data.token)
        localStorage.setItem('userId', data.user.id); // Matches your backend "id"
        localStorage.setItem('user', JSON.stringify(data.user));

        if (setToken) setToken(res.data.token)
        setUser(res.data.user)

        return res
    }


    const logout = (email, password) => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("userId");
        setUser(null)
        setToken(null)
    }

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider }
export const useAuth = () => useContext(AuthContext)
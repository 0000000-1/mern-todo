import React, { useState } from 'react'
import { Link, useNavigate } from "react-router"
import { useAuth } from "../context/AuthContext"

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login, setUser } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    setError('')

    try {
      const res = await login(email, password)

      alert('Login successful')

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user._id); // Save the ID for CreatePage
      localStorage.setItem("user", JSON.stringify(res.data.user)); // Save full user for Refresh

      // setUser(res.data.user);
      // return res
      console.log(res);

      navigate('/')

    } catch (err) {
      console.log(err);

      setError(err.response?.data?.message || 'Invalid email or password')

    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center px-4 "> {/* Added bg-black for context */}
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-800">
        <form onSubmit={handleSubmit} className="space-y-5">
          <h1 className="text-2xl font-bold text-white">Login</h1>
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-xs p-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1.5">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-1.5">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
            />
          </div>

          {/* Submit Button */}
          <button
            className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition text-sm"
            type="submit"
          >
            Submit
          </button>
        </form>

        {/* Switch to Register */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Create new account?{' '}
          <Link to="/register" className="text-emerald-500 hover:text-emerald-400 font-medium transition">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )

}

export default Login
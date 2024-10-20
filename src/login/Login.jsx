import React, { useState, useContext } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import {AuthContext} from '../context/AuthContext';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setAuthState } = useContext(AuthContext); // This will store token & role

  const handleLogin = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post('http://localhost:5000/api/user/login', { email, password });
          const { token, user } = response.data;

          // Save token and user info in localStorage
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));

          // Update AuthContext
          setAuthState({ token, user});

          // Redirect based on user role
          if (user.role === 'admin') {
              navigate('/admin');
          } else if (user.role === 'user') {
              navigate('/user');
          }
      } catch (error) {
          setError(error.response?.data?.message || 'Login failed');
      }
  };
  return (
    <div className="h-[100vh] w-[100%] flex  justify-center items-center ">
    
    <form onSubmit={handleLogin} className="md:w-[400px] w-[80%] shadow-lg shadow-blue-300 rounded-lg p-[20px] space-y-6">
      <h1 className="font-bold md:text-3xl text-2xl mb-[30px]">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      {/* Email */}
      <div>
        <label htmlFor="email" className="block font-semibold text-sm mb-2">Email</label>
        <input
          type="email"
          id="email"
        //   value={email}
        //   onChange={(e) => setEmail(e.target.value)}
          placeholder="youremail@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-[100%] border border-gray-500 p-2 rounded-md"
          required
        />
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block font-semibold text-sm mb-2">Password</label>
        <input
          type="password"
          id="password"
        //   value={password}
        //   onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-[100%] border border-gray-500 p-2 rounded-md"
          
        />
      </div>

      <button type='submit' className="w-[100%] bg-blue-600 p-2 rounded-md text-white">Login</button>
      <p className="text-sm text-gray-500">Don't have an account? <Link to={"/register"} className="text-black font-semibold">Register here</Link></p>
    </form>
  </div>
  )
}

export default Login

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');  // Default role to 'user'
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/user/register', {
                username,
                email,
                mobile,
                password,
                role
            });

            // Registration successful, redirect to login page
            navigate('/login');
        } catch (error) {
            setError(error.response?.data?.message || 'Registration failed');
        }
    }; 
  return (
    <div className="h-[100vh] w-[100%] flex justify-center items-center">
    <form onSubmit={handleRegister} className="md:w-[400px] w-[80%] shadow-lg shadow-blue-300 rounded-lg p-[20px] space-y-4">
      <h1 className="font-bold md:text-3xl text-xl mb-[25px]">Register</h1>
      {error && <p className="text-red-500">{error}</p>}
      {/* {success && <p className="text-green-500">{success}</p>} */}

      {/* Username */}
      <div>
        <label htmlFor="username" className="block font-semibold text-sm mb-2">Username</label>
        <input
          type="text"
          id="username"
         value={username}
        onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
          className="w-[100%] border border-gray-500 p-2 rounded-md"
          required
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block font-semibold text-sm mb-2">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="youremail@example.com"
          className="w-[100%] border border-gray-500 p-2 rounded-md"
          required
        />
      </div>
      {/* Mobile */}
      <div>
        <label htmlFor="mobile" className="block font-semibold text-sm mb-2">Mobile</label>
        <input
          type="text"
          id="mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          placeholder="1234567891"
          className="w-[100%] border border-gray-500 p-2 rounded-md"
          required
        />
      </div>
        {/* Role */}
        <div>
        <label htmlFor="password" className="block font-semibold text-sm mb-2">Role</label>
        <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="border rounded-lg w-full p-2"
                    >
                      <option value="admin">Admin</option>
                        <option value="user">User</option>
                        
                    </select>
      </div>
      {/* Password */}
      <div>
        <label htmlFor="password" className="block font-semibold text-sm mb-2">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-[100%] border border-gray-500 p-2 rounded-md"
          required
        />
      </div>
     

      <button type="submit"  className="w-[100%] bg-blue-600 p-2 rounded-md text-white">Register</button>
      <p className="text-sm text-gray-500">Already have an account? <Link to={"/login"} className="text-black font-semibold">Login here</Link></p>
    </form>
  </div>
  )
}

export default Register

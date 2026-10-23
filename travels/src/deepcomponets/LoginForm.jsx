import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';

const LoginForm = ({ onLogin }) => {
    const [form, setForm] = useState({ username: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate=useNavigate();
    const location =useLocation();
    const registerSuceedingMsg=location.state?.message;

    const handlechange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login/', form);
            setMessage('Login successful!');
            if (onLogin) {
                onLogin(response.data.token, response.data.user_id);
            }navigate('/buslist')
        } catch (error) {
            console.log("LOGIN ERROR:", error);
            setMessage("Login Failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">

            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
               {registerSuceedingMsg &&(
                <div className='bg-screeen-100 border border-green-400 text-green-70 px-4 py-3 rounded relative text-center mb-4'role='alert'>
                     <span className='block sm:inline'>{registerSuceedingMsg}</span>
                     </div>
               )}
                      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                            <input 
                                type="text" 
                                name="username" 
                                value={form.username} 
                                onChange={handlechange}
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Enter your username"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input 
                                type="password" 
                                name="password" 
                                value={form.password} 
                                onChange={handlechange}
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Enter your password"
                            />
                        </div>
                    </div>

                    <div>
                        <button 
                            type='submit'
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                            Login
                        </button>
                    </div>
                    <div className="text-center text-sm text-gray-600 mt-4">
  New user?{" "}
  <a
    href="/register"
    className="text-blue-600 hover:underline font-semibold"
  >
    Register here
  </a>

 </div>
                    {message && (
                        <p className={`text-center text-sm font-medium ${message.includes('successful') ? 'text-green-600' : 'text-red-500'}`}>
                            {message}
                        </p>
                    )}
                </form>
            </div>
        
    );
};


export default LoginForm;
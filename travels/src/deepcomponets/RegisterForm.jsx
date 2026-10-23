import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    let [form, setForm] = useState({ username: '', email: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate=useNavigate()

    const handlechange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('sending data:',form);
            await axios.post('http://127.0.0.1:8000/api/register/', form);
            setMessage('Registration successful');
            navigate('/login',{state:{message:'Registration suceesful!'}});
        } catch (err) {
            console.log('status:',error.response?.status);
            console.log('Backend Error:',err.response?.data);
            console.log('Full error:',err);
            setMessage("Registration Failed: " + JSON.stringify(error.response?.data || error.message));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create an account
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
                                placeholder="Choose a username"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input 
                                type="email" 
                                name="email" 
                                value={form.email} 
                                onChange={handlechange}
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Enter your email"
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
                                placeholder="Create a password"
                            />
                        </div>
                    </div>

                    <div>
                        <button 
                            type='submit'
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                            Register
                        </button>
                    </div>
                    {message && (
                        <p className={`text-center text-sm font-medium ${message.includes('successful') ? 'text-green-600' : 'text-red-500'}`}>
                            {message}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
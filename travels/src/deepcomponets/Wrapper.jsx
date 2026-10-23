import React from 'react';
import { Link } from 'react-router-dom';

const Wrapper = ({ token, handleLogout, children }) => {
  const logout = () => {
    handleLogout();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
          
          
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-blue-600">
              TravelGo
            </Link>
          </div>

          
          <div className="flex items-center space-x-6">
            
            
            <Link to="/buslist" className='text-gray-600 hover:text-blue-600 font-medium transition duration-200'>
            
              BUSES
            </Link>

            
            {token && (
              <Link to="/my-bookings" style={{ textDecoration: 'none', color: '#333' }}>
                My Bookings
              </Link>
            )}

            
            {!token ? (
              <Link to="/login">
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                  Login
                </button>
              </Link>
            ) : (
              <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">
                Logout
              </button>
            )}

          </div>
        </div>
        
      </nav>

      
      <main className="flex-grow p-4">
        {children}
      </main>
      
    </div>
  );
};

export default Wrapper;
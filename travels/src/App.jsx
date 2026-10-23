import React from'react'
import {Routes,Route,Navigate}from 'react-router-dom'
import Wrapper from "./deepcomponets/Wrapper";
import Home from './deepcomponets/Home';
import RegisterForm from "./deepcomponets/RegisterForm";
import LoginForm from "./deepcomponets/LoginForm";
import BusList from "./deepcomponets/BusList";
import BusSeats from "./deepcomponets/BusSeats"
import UserBookings from "./deepcomponets/UserBookings";

import { useState } from 'react'

const App=() =>{
   const [token,setToken]=useState(localStorage.getItem('token'));
   const [userId,setuserId]=useState(localStorage.getItem('userId'));
  const handleLogin=(token,userId)=>{

  
    localStorage .setItem('token',token);
    localStorage.setItem('userId',userId);
        setToken(token);
        setuserId(userId);
  };

const handleLogout=()=>{
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  setToken(null)
}
  return(
    <div>
     

      <Wrapper handleLogout={handleLogout}token={token}>
    
    <Routes>
      
      <Route path='/' element={<Home token ={token}/>}/>
      <Route path='/register' element={<RegisterForm/>}/>
     
        <Route path='/login' element={<LoginForm onLogin={handleLogin}/>}/>
       <Route path='/buslist'element={<BusList/>}/>
       <Route path='/bus/:busId' element={<BusSeats token={token}/>}/>
       <Route path='/my-bookings' element={<UserBookings token={token}userId={userId}/>}/>
              
      </Routes>

</Wrapper>



    </div>
  )

}
export default App
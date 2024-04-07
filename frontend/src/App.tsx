import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './authentication/login';
import Register from './authentication/register';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import StudentDashboard from './classes/students/dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './reducers/authreducer/combinedReducers';
import { authSlice } from './reducers/authreducer/authReducer';
import Navbar from './navbar/navbar';





function App() {

  const dispatch = useDispatch();
  const user = useSelector((state:RootState)=>state.auth);
  

  useEffect(()=>{
    dispatch(authSlice.actions.setLogged({}))
  },[user])
  return (
    <div>
      <Navbar/>
      <BrowserRouter>
      <Routes>
      <Route path="/login" element={(user.token==="")? <Login/>:<Navigate to="/dashboard"/>}/>
      <Route path="/register" element={(user.token==="")? <Register/>:<Navigate to="/dashboard"/>}/>
      <Route path="/dashboard" element={(user.token!=="")? <StudentDashboard/>:<Navigate to="/login"/>}/>
      <Route path='/' element={<Navigate to="/login"/>}/>

      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;

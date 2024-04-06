import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './authentication/login';
import Register from './authentication/register';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './classes/dashboard';




function App() {
  const [user, setUser] = useState({
    role:"",
    id:"",
    token:"",
    email:"",
    username:""
  })

  const setLogged =()=>{
    if(localStorage.getItem("user")){
      const userFromStore  = JSON.parse(localStorage.getItem("user") as string);
      setUser({
        role: userFromStore.role,
        id: userFromStore.uid,
        email:userFromStore.email,
        token:userFromStore.token,
        username:userFromStore.username
      });
    }
  }

  useEffect(()=>{
    setLogged();
  },[user])
  return (
    <div>
      <BrowserRouter>
      <Routes>
      <Route path="/login" element={(user.token==="")? <Login/>:<Navigate to="/dashboard"/>}/>
      <Route path="/register" element={(user.token==="")? <Register/>:<Navigate to="/dashboard"/>}/>
      <Route path="/dashboard" Component={Dashboard}/>
      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;

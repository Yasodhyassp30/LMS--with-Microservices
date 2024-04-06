import React, { useEffect } from 'react'
import { instance } from '../axiosConfig'

export default function Dashboard() {

const getClasses = async () => {
    try{
        const res = await instance.get("/classes");
        console.log(res.data);

    }catch(err){
        console.log(err);
    }
}

useEffect(()=>{
    getClasses();
},[])
  return (
    <div>Dashboard</div>
  )
}

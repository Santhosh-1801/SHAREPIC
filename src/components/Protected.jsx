import React from 'react'
import { UserAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'
import { fetchUser } from '../utils/fetchUser'


const Protected = ({children}) => {
  const user=fetchUser();
  if(!user){
    return <Navigate to="/login"/>
  }
  return children
}

export default Protected
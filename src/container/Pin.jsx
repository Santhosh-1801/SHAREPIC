import React, { useState } from 'react'
import { Routes,Route } from 'react-router-dom'

import {  Navbar,Feed,PinDetailing,CreatePin,Search,UserProfile} from "../components";


const Pin = ({userInfo}) => {

  const [searchTerm,setSearchTerm]=useState("");

  return (
    <div className='px-2 md:px-5'>
        <div className='bg-white'>
            <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} userInfo={userInfo}/>
        </div>
        <div className='h-full' style={{marginLeft:"10px"}}>
            <Routes>
                <Route path='/*' element={<Feed/>}/>
                <Route path="/user-profile/:userId" element={<UserProfile/>}/>
                <Route path="/category/:categoryId" element={<Feed/>}/>
                <Route path="/pin-detail/:pinId" element={<PinDetailing userInfo={userInfo}/>}/>
                <Route path="/create-pin" element={<CreatePin userInfo={userInfo}/>}/>
                <Route path="/search" element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>}/>
                
            </Routes>
        </div>
    </div>
  )
}

export default Pin
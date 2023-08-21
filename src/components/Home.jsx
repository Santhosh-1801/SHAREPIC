import React,{useState,useEffect, useRef} from 'react'
import { Route, Routes, useNavigate} from 'react-router-dom';
import { fetchUser } from '../utils/fetchUser';
import Pin from '../container/Pin'
import { client } from '../client';


const Home = () => {

  const [userInfo,setuserInfo]=useState(null);

  const user=fetchUser();

  console.log(user)




  useEffect(()=>{
    client.fetch(`*[_type == 'user' && _id=='${user?.sub}']`).then((data)=>{
      setuserInfo(data[0]);
    })
  },[])

  
  const navigate=useNavigate();
  
  const scrollRef=useRef(null);

  useEffect(()=>{
    scrollRef.current.scrollTo(0,0);
  },[])

  const handleSignOut=async()=>{
    try{
      localStorage.clear();
      navigate("/login")
    }
    catch(error){
      console.log(error);
    }
  }

  return (
    <div className='flex flex-col h-full transition-height duration-75 ease-out'>
       <div className='pb-2 flex-1 h-screen overflow-y-scroll hide_scrollbar' ref={scrollRef}>
       <Routes>
          <Route path="/*" element={<Pin userInfo={userInfo && userInfo} />} />
        </Routes>
      </div>
    </div>
  )
}

export default Home
import React, { useEffect, useState } from 'react'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner';
import notFound from "../assets/notfound.png"
import { useParams } from 'react-router-dom';
import { searchQuery,feedQuery } from '../utils/data';
import { client } from './../client';


const Feed = () => {
  const [loading,setLoading]=useState(false)
  const [pins,setPins]=useState(null);  

  const {categoryId}=useParams();

  useEffect(()=>{
    setLoading(true)
    if(categoryId){
      const query=searchQuery(categoryId)
      client.fetch(query).then((data)=>{
        setPins(data)
        setLoading(false)
      })
      console.log(pins);
    }
    else {
      client.fetch(feedQuery).then((data)=>{
        console.log(data)
        setPins(data)
        setLoading(false)
      })
    }
  },[categoryId])
 

  if(loading) return(
    <Spinner/>
  )
  if(!pins?.length){
    return (
      <div className='w-full h-screen flex flex-col justify-center items-center'>
           <img src={notFound} className="w-[30%] mt-5" alt="" />
      </div>
    )
  }
  return <div>{<MasonryLayout pins={pins} />}</div>;

}

export default Feed
import React, { useEffect, useState } from 'react'
import { feedQuery, searchQuery } from '../utils/data';
import { client } from '../client';
import Spinner from './Spinner';
import MasonryLayout from './MasonryLayout';
import notFound from "../assets/notfound.png"

const Search = ({searchTerm,setSearchTerm}) => {

  const [pins,setPins]=useState(null);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
      if(searchTerm){
        setLoading(true);
        const query=searchQuery(searchTerm.toLowerCase());
        client.fetch(query).then((data)=>{
          setPins(data);
          setLoading(false);
        })
      }
      else{
        client.fetch(feedQuery).then((data)=>{
          setPins(data);
          setLoading(false);
        })
      }
  },[searchTerm])

  return (
    <div>
      {loading && (<Spinner/>)}
      {pins?.length!==0 && <MasonryLayout pins={pins}/>}
      {pins?.length === 0 && searchTerm!=="" && !loading && (
        <div className='w-full h-screen flex flex-col justify-center items-center'>
            <img src={notFound} className='w-[30%] mt-5'/>
        </div>
      )}
    </div>
  )
}

export default Search
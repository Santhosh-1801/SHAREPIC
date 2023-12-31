import React, { useEffect, useState } from 'react'
import { IoMdCloudDownload, IoMdSend } from 'react-icons/io';
import { Link, useParams } from 'react-router-dom';
import {v4 as uuidv4} from "uuid"
import { client, urlFor } from '../client';
import MasonryLayout from './MasonryLayout';
import { pinDetailQuery,pinDetailMorePinQuery } from '../utils/data';
import Spinner from './Spinner';
import { IoSend } from 'react-icons/io5';




const PinDetailing = ({userInfo}) => {
  const [pins,setPins]=useState(null);
  const [pinDetail,setPinDetail]=useState(null);
  const [comment,setComment]=useState("")
  const [addingComment,setAddingComment]=useState(false);




  const {pinId}=useParams();



  const addComment=()=>{

    if(comment){
      setAddingComment(true)

      client.patch(pinId).setIfMissing({comments:[]}).insert("after","comments[-1]",[
        {
          comment,
          _key:uuidv4(),
          postedBy:{
            _type:"postedBy",
            _ref:userInfo._id,
          }
        }
      ]).commit().then(()=>{
        fetchPinDetail();
        setComment("");
        setAddingComment(false)

      })
    }

  }





  const fetchPinDetail=()=>{
    let query=pinDetailQuery(pinId);
    if(query){
      client.fetch(query).then((data)=>{
        console.log(data)
        setPinDetail(data[0])

        if(data[0]){
          query=pinDetailMorePinQuery(data[0])
          client.fetch(query).then((res)=>{
            setPins(res)
          })
        }
      })
    }
  }

  useEffect(()=>{
    fetchPinDetail();
  },[pinId])

  if(!pinDetail){
    return <Spinner/>
  }

  



  return (
    <>
    <div className="flex xl:flex-row flex-col m-auto bg-white p-4" style={{maxWidth:'1500px',borderRadius:"35px"}}>
      <div className='flex justify-center items-center md:items-start flex-initial'>
        <img src={pinDetail?.image && urlFor(pinDetail.image).url()} className='rounded-t-3xl rounded-b-lg'/>
      </div>
      <div className='w-full p-5 flex-1 xl:min-w-620'>
        <div className='flex justify-between items-center'>
            <div className='flex gap-2 items-center'>
                <a href={`${pinDetail?.image?.asset.url}?dl`} download onClick={(e)=>e.stopPropagation()} className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline:none'>
                    <IoMdCloudDownload/>
                </a>
            </div>
            <a href={pinDetail.destination} target='_blank' rel="noreferrer">
              {pinDetail.destination.length>15?`${pinDetail.destination}`:pinDetail.destination}
            </a>
        </div>
        <div>
          <h1 className='text-2xl font-bold mt-3 break-words'>
            {pinDetail.title}
          </h1>
          <p className='mt-3'>{pinDetail.about}</p>
        </div>
        <Link to={`user-profile/${pinDetail.about}`}>
          <img src={pinDetail.postedBy?.image} className="w-8 h-8 rounded-full object-cover"
              alt=""/>
            <p className='font-semibold capitalize'>{pinDetail.postedBy?.username}</p>
        </Link>
        <h2 className='mt-5 text-2xl'>
            Comments
        </h2>
        <div className='max-h-370 overflow-y-auto'>
            {pinDetail?.comments?.map((comment,i)=>(
              <div className='flex gap-2 mt-5 items-center bg-white rounded-lg' key={i}>
                  <img src={comment.postedBy.image} alt='' className='w-10 h-10 rounded-full cursor-pointer'/>
                  <div className='flex flex-col'>
                    <p className='flex flex-col'>
                      {comment.postedBy.userName}
                    </p>
                    <p>{comment.comment}</p>
                  </div>
              </div>
            ))}
        </div>
        <div className='flex flex-wrap items-center mt-6 gap-3'>
            <Link to={`user-profile/${pinDetail.postedBy?._id}`} className="">
              <img  src={pinDetail.postedBy?.image}
                className="w-10 h-10 rounded-full cursor-pointer"
                alt=""/>
            </Link>
            <input type='text' className='flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300' placeholder='Add a comment' value={comment}  onChange={(e) => setComment(e.target.value)}/>
            <IoSend
              fontSize={25}
              className="cursor-pointer"
              onClick={addComment}
            />
        </div>
      </div>
    </div>
    {pins?.length > 0 ? (
      <>
        <h2 className="text-center font-bold text-2xl mt-8 mb-1">
          Recommended Post
        </h2>
        <MasonryLayout pins={pins} />
      </>
    ) : (
      <Spinner className="mb-2"/>
    )}
    </>
  )
}

export default PinDetailing
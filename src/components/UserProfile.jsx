import React, { useEffect, useRef, useState } from 'react' 
import { AiOutlineLogout } from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchUser } from '../utils/fetchUser';
import { client } from '../client';
import { googleLogout } from '@react-oauth/google';
import Spinner from './Spinner';
import MasonryLayout from './MasonryLayout';
import { userCreatedPinsQuery, userSavedPinsQuery } from '../utils/data';


const randomImage="https://source.unsplash.com/1600x900/?nature,photography,technology";

const activeBtnStyles =
  "bg-red-500 text-white font-bold p-2 rounded-lg shadow-lg w-20 outline-none";
const notActiveBtnStyles =
  "bg-primary text-black mr-4 font-bold p-2 rounded-lg w-20 outline-none";







const UserProfile = () => {

  const [userInfo,setuserInfo]=useState(null);
  const [pins,setPins]=useState(null);
  const [text,setText]=useState("created");
  const [activeBtn,setActiveBtn]=useState("created");
  const navigate=useNavigate();
  const {userId}=useParams();


  const user=fetchUser();

  console.log(user)




  useEffect(()=>{
    client.fetch(`*[_type == 'user' && _id=='${userId}']`).then((data)=>{
      console.log(data);
      setuserInfo(data[0]);
    })
  },[text,userId])

  useEffect(() => {
    if (text === 'created') {
      const createdPinsQuery = userCreatedPinsQuery(userId);

      client.fetch(createdPinsQuery).then((data) => {
        setPins(data);
      });
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId);

      client.fetch(savedPinsQuery).then((data) => {
        setPins(data);
      });
    }
  }, [text, userId]);

  
  

  const handleSignOut=async()=>{
    try{
      localStorage.clear();
      navigate("/login")
    }
    catch(error){
      console.log(error);
    }
  }

  if (!userInfo) {
    return <Spinner/>;
  }
  console.log(userInfo)


  return (
    <div className='relative pb-2 h-full justify-center items-center'>
  <div className='flex flex-col pb-3'>  
    <div className='relative flex flex-col mt-9'>
      <div className="flex flex-col justify-center items-center">

        <img
          src={userInfo.image}
          className="rounded-full w-20 h-20 -mt-10 shadow-2xl object-cover"
          alt=""
        />
                  <h1 className='font-bold text-3xl text-center mt-3'>{userInfo.username}</h1>
                  <div className='absolute top-2 z-1 right-2'>
                      {userId === userInfo._id &&(
                        <button
                        type="button"
                        className="bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
                        onClick={handleSignOut}
                      >
                        <AiOutlineLogout color="red" fontSize={21} />
                      </button>
                      )}
                  </div>
              </div>
              <div className="text-center mb-7">
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("created");
              
              }}
              className={`${
                activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Created
            </button>
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("saved");
              }}
              className={`${
                activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Saved
            </button>
          </div>

          <div>

          {pins?.length ? (
            <div className="px-2">
              <MasonryLayout pins={pins} />
            </div>
          ) : (
            <div className="flex justify-center items-center font-bold w-full text-xl mb-200">
              No Pins Found
            </div>
          )}

          </div>
          </div>
      </div>
    </div>
  )
}

export default UserProfile
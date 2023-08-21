
import React, { useState,useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FcSearch } from 'react-icons/fc';
import { RiHome6Fill } from 'react-icons/ri';
import {FcPlus} from 'react-icons/fc'
import {BiChevronLeft, BiChevronRight} from 'react-icons/bi'

import logo from '../assets/sharepiccircle.png';

import { categories } from '../utils/data';

const isNotActiveStyle =
  "flex items-center px-3 ml-px:4 md:px-5 gap-2 md:gap-3 text-gray-500 hover:text-black ";

const isActiveStyle =
  "flex items-center px-3 ml-px:4 md:px-5 gap-2 md:gap-3 font-extrabold ";

const Navbar = ({ searchTerm, setSearchTerm, userInfo }) => {

  const[scroll,setScroll]=useState(false);

  const scrollRef=useRef();

  const navigate=useNavigate()

  const scrollOnClick = (side) => {
    setScroll(true);
    console.log(side)
    side === "right"
      ? (scrollRef.current.scrollLeft += 200)
      : (scrollRef.current.scrollLeft -= 200);

      scrollRef.current.scrollLeft<199?setScroll(false):setScroll(true);
  };

  
  console.log(userInfo)

  return (
    <div className='flex flex-col'>
      <div className="flex items-center w-ful py-2">
        <Link to="/">
          <img src={logo} className="w-20 cursor-pointer" />
        </Link>
        <div className="flex justify-between items-center w-full bg-white p-4 shadow-md rounded-lg mx-4">
          <FcSearch fontSize={30} />
          <input
            type="text"
            placeholder="Search"
            className="w-full outline-none border-none px-4 text-black-800 font-bold"
            value={searchTerm}
            onFocus={() => navigate("/search")}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className='flex justify-center items-center'>
          <Link to="create-pin">
            <button type='button' className='w-36 min-w-36 p-5 text-base text-gray-800 border border-gray-20 
            rounded-md hover:shadow-xl duration-150 ease-in-out md:flex hidden'>
              Create a Post
            </button>
            <div className="bg-white w-10 h-10 rounded-md md:hidden flex items-center justify-center">
              <FcPlus fontSize={24} className="text-white" />
            </div>
          </Link>
          <Link to={`user-profile/${userInfo?._id}`} className='flex items-center justify-center w-10 min-w-10 h-10 min-h-10 shadow-lg rounded-full ml-4'>
            <img src={userInfo?.image}/>
          </Link>
        </div>
        </div>
        <div className='flex items-center w-full py-2'>
          <NavLink to="/" className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}>
             <RiHome6Fill fontSize={30} />
          </NavLink>
          <div className='h-6 w-[1px] bg-slate-500 '></div>
          <div className='flex items-center w-full m-2 h-10 overflow-y-scroll hide_scrollbar relative '>
            <div className={`${scroll?"flex":"hidden"} absolute left-0 w-32 h-10 justify-start items-center bg-gradient-to-r from-gray-50 cursor-pointer`} onClick={()=>scrollOnClick("left")}>
              <BiChevronLeft fontSize={30} style={{marginTop:"5px"}} />
            </div>
            <div className='flex items-center w-full overflow-y-scroll hide_scrollbar scroll-smooth duration-150 ease-in-out relative ml-5' id="category" ref={scrollRef}>
              {
                categories.slice(0,categories.length-1).map((category)=>(
                  <NavLink to={`/category/${category.name}`}
                  key={category.name}
                  className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}
                  >
                  {category.name}
                  </NavLink>
                ))
              }
            </div>
            <div className="absolute right-0 w-32 h-10 md:flex hidden justify-end items-center bg-gradient-to-l from-gray-50 cursor-pointer"
              onClick={()=>scrollOnClick("right")}
            >
              <BiChevronRight fontSize={30} style={{marginTop:"1px"}}/>
            </div>
          </div>
          </div>
    </div>
  );
};

export default Navbar; 
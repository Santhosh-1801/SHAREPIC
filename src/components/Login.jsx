import React, { useEffect } from 'react';
import '../components/Login.css';
import MyVideo from '../assets/socialmedia.mp4';
import picturelogo from "../assets/sharepic.png"
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import {client} from '../client';

const Login = () => {

  const navigate=useNavigate();




  const handleGoogleSignIn=async(response)=>{


       var decoded=jwtDecode(response.credential);
       console.log(decoded)
       localStorage.setItem('user',JSON.stringify(decoded));
       console.log(localStorage.getItem('user'))
       const { name, picture, sub: googleid } = decoded; 
       console.log(name,picture,googleid);
         const doc={
        _id:googleid,
        _type:'user',
        username:name,
        image:picture,
       }
        client.createIfNotExists(doc).then(()=>{
          navigate("/home",{replace:true})
        })   

  }
  useEffect(() => {
    const user1=localStorage.getItem('user')
    if (user1 != null) {
      navigate('/home');
    }
  }, [localStorage.getItem('user')]);
  
  return (
    <>
      <video src={MyVideo} autoPlay muted loop className='videoplaying'>
        Your browser does not support HTML5 video.
      </video>
      <div className='loginscreen'>
        <div className='center-content'>
          <img src={picturelogo} width={"200px"} height={"200px"}/>
          <div style={{ marginTop: "30px" }}>
          <GoogleLogin
            clientId='684124019192-isivkpmc014vu2ane5pgd25u95hj73sq'
            onSuccess={handleGoogleSignIn}
            onFailure={handleGoogleSignIn} 
            >


          </GoogleLogin>
        </div>
      </div>
      </div>
    </>
  );
};

export default Login;
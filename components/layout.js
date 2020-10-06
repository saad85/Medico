
import Head from 'next/head';
import Navbar from './navbar';
import CommonHelpers from '../pages/helpers/helper';
import React, { useState,useEffect } from "react";


const layout = (props) =>{
  
  const [userId,setUserId] = useState(null);
  
  let helpers = CommonHelpers() || null ,
  currentUserId = helpers.getCurrentUserId() || '';

  function setCurrentUserId(userId){

    console.log("user Id in setCurrentUserId ",userId);
    if(userId) setUserId(userId);
  }

    useEffect(() => {
      setCurrentUserId(currentUserId);
      return () => {
        
      }
    }, [])

      return (
        <div>
       
          <Navbar currentUserId={currentUserId} setCurrentUserId={setCurrentUserId}/>
       
          <div>
             {props.children}
          </div>
       
          <style jsx global>{`
                   html,
                   body {
                     padding: 0;
                     margin: 0;
                     font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
                       Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
                       sans-serif;
                   }
       
                   * {
                     box-sizing: border-box;
                   }
                   a{
       
                     font-family: 'Oswald', sans-serif;
                     color:#127ba3!important;
                   }
                 `}</style>
        </div>
       
       );
} 

export default layout;


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoginSignup from "../components/LoginSignup";
import Tasks from "../components/Tasks";
import { Navigate } from "react-router-dom";

const HomeScreen = () => {
  
  
    const { userInfo } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.user);

    return (
        <>
        {
            user ? ( 
                <>
                <h2 style={{marginTop:'50px',textAlign:'center',fontWeight: 'bold'}} className="text-success">Task Manager</h2>
                    <Tasks style={{marginTop:'50px'}} data={user} />
                </>
              ): (
                
                <LoginSignup />
                
            )
        }
        </>
    )
}

export default HomeScreen;
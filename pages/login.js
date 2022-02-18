import { useEffect } from "react";
import { v4 } from 'uuid';
import ls from 'local-storage';
import LoginUser from "../components/LoginUser";

export default function Login(props) {
  

  useEffect((users,guestUser)=>{
    users = [];
    if(ls('users') < 1) {
      guestUser = {
        id: v4(),
        user: "Guest", 
        myListID: []
      }
      users.push(guestUser)
      ls('users', users)
    
      console.log('users:', users)
      console.log('lsusers', ls('users'))
    } 
  })

  return (
    <>
        <LoginUser/>
    </>
    
  )
}
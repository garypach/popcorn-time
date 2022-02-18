import { useEffect } from "react";
import CreateUser from "../components/CreateProfile/CreateUser";
import { v4 } from 'uuid';
import ls from 'local-storage';
import { color } from "gulp-cli/lib/shared/cli-options";
import LoginUser from "../components/Login/LoginUser";

export default function LoginPage(props) {
  

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
        {/* <CreateUser/> */}
    </>
    
  )
}
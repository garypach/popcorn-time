import { useEffect } from "react";
import CreateUser from "../components/CreateProfile/CreateUser";
import Login from "../components/Login/Login";
import { v4 } from 'uuid';
import ls from 'local-storage';
import { color } from "gulp-cli/lib/shared/cli-options";

export default function LoginPage(props) {
  

  useEffect((users,guestUser)=>{
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
        <Login/>
        {/* <CreateUser/> */}
    </>
    
  )
}
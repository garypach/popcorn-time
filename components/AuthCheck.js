import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ls from "local-storage";


const AuthCheck = (component) => {
  const router = useRouter();
  let activeUID = ls('activeUID');
  let users = ls('users') !== null ? ls('users') : [];

  useEffect(() => {
    // if(users.length >= 1) {
    //   router.push('/login')
    // }
    if( activeUID === null || users.length < 1) {
      router.push('/login')
    }
  }, [users.length, activeUID,router])
  
  
  return component
}

export default AuthCheck;
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ls from "local-storage";
import { useMounted } from "./useMounted";


const AuthCheck = (component) => {
  const router = useRouter();
  const {hasMounted} = useMounted();
  let activeUID = ls('activeUID');
  let users = ls('users') !== null ? ls('users') : [];

  useEffect(() => {
    // if(users.length >= 1) {
    //   router.push('/login')
    // }
    if( activeUID === null || users.length < 1) {
      router.push('/login')
    }
  }, [])

  if(users.length >= 1 && activeUID  !== null) {
    return hasMounted ? (component) :''
  }
  return component
}

export default AuthCheck;
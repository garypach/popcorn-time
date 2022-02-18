import Head from 'next/head'
import {useState, useEffect} from 'react';
import { useStateContext } from '../Provider';
import { useRouter } from 'next/router';
import ls from 'local-storage';
import { useMounted } from '../util/useMounted';
import Image from 'next/image'
const LoginUser = () => {
  const loginStyle = {
    background:'rgb(31, 31, 31)',
    height:'100vh',
    width:'100%',
    display:'flex',
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
    overflow:'hidden',
    background: 'rgb(48,123,207)',
    background: 'linear-gradient(135deg, rgb(0,0,0,1) 60%, rgb(48,123,207,1) 80%, rgba(62,185,62,1) 100%)', minHeight:'100vh',
 }
 
  const globalState = useStateContext();
  const router = useRouter();
  const [loadingUsers, setLoadingUsers] = useState(false)
  let users = ls('users') !== null ? ls('users') : []
  const {hasMounted} = useMounted();

  useEffect(() => {
    if(users < 1) {
      setLoadingUsers(false)
    }
    console.log('load effect', users)
  }, [])

  console.log('declared users', users)
  const selectUser = (id) => {
    console.log(id)
    ls('activeUID', id)
    router.push('/')
  }
  const showUsers = () => {
    if(!loadingUsers) {
      return users.map((user) => {
        return(
          <div onClick={() => selectUser(user.id)} className="login-user__profile" key={user.id}>
            <div>
              <Image src="https://www.pngitem.com/pimgs/m/279-2799324_transparent-guest-png-become-a-member-svg-icon.png" alt="guest-image" width={500} height={500}/>
            </div>
            <div className="login-user__user-name">{user.user}</div>
          </div>
        )
      })
    }
  }

  const createUser = () => {
    router.push('/create')
  }

  return (
    <div style={loginStyle}>
       <div className="login-user">
        <div className="login-user__top">
          <span className="login-user__title">
            Who Is Watching?
          </span>
        </div>

        <div className="login-user__form">
          { hasMounted ? showUsers() : '' }
          <div className="login-user__buttons" onClick={createUser}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="white" d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256 368C269.3 368 280 357.3 280 344V280H344C357.3 280 368 269.3 368 256C368 242.7 357.3 232 344 232H280V168C280 154.7 269.3 144 256 144C242.7 144 232 154.7 232 168V232H168C154.7 232 144 242.7 144 256C144 269.3 154.7 280 168 280H232V344C232 357.3 242.7 368 256 368z"/></svg>
          <button className="login-user__kid" onClick={createUser}>Add User</button>
     </div>
        </div>
       
      </div>
     </div>
  )
}
export default LoginUser;
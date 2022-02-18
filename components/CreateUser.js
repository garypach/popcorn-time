import {useStateContext} from './Provider'
import ls from 'local-storage'
import {v4} from 'uuid'
import { useRouter } from 'next/router'
import Image from 'next/image'

export default function CreateUser() {
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
  const router = useRouter ();
  const saveUser = () => {
    let users = [];
    let user;

    if(ls('users') < 1) {
      
      user = {
        id: v4(),
        user: globalState.user, 
        myListID: []
      }
      users.push(user)
      ls('users', users)
      console.log('users:', users)
      console.log('lsusers', ls('users'))
    } else {
      users = ls('users')
      user = {
        id: v4(),
        user: globalState.user, 
        myListID: []
      }
      users.push(user)
      ls('users', users)
      console.log('users:', users)
      console.log('lsusers', ls('users'))
      router.push('/login')
    }
  }

  const cancelAddUser = () =>{
    router.push('/login')
  }
  return (
    <div style={loginStyle}>
    <div className="create-user-cont">
        <div className="create-user__top">
          <span className="create-user__title">
            Add Profile
          </span>
        </div>

        <div className="create-user__form">
            <div>
                <Image src="https://www.pngitem.com/pimgs/m/279-2799324_transparent-guest-png-become-a-member-svg-icon.png" alt="guest-image" width={500} height={500}/>
            </div>
            <div className="create-user__input-group">
              <input placeholder='Name' value={globalState.user} onChange={globalState.createUserAction} type="text" className="create-user__inputText"/>
            </div>
        </div>
        <div className="create-user__buttons">
          <button className="create-user__save create-buttons create-buttons__preferred" onClick={saveUser}>Save</button>
          <button className="create-user__cancel create-buttons" onClick={cancelAddUser}>Cancel</button>
        </div>
    </div>
    </div>
  )
}
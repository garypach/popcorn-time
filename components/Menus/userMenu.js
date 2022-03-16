import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import Link from "next/link"
import { useState } from 'react'
import { useStateContext } from '../Provider'
import MyListComponent from '../myListComponent'
import ls from 'local-storage';
import router from 'next/router'
function UserMenu(props) {

    const globalState = useStateContext()

    function switchUser(){
        globalState.setUserMenuOpenAction(false)
        ls.remove('activeUID')
        router.push('/login')
    }
    return(

        //class: any extra class
        // type: background transparent or black border white.."defualt" or "filled"
        <div className={`user-menu-cont ${globalState.userMenuOpen ? 'user-menu-cont--active' : ''}`}>
           <div className='user-menu-wrapper'>
               <div className='user-menu-my-list'>
                <MyListComponent extraclass="user-menu-component"/>
               </div>
               <div className='user-menu'>
                     <div style={{margin:"25px 0"}}>
                     <Link href={"/mylist"} >
                         <a>
                        <p onClick={()=> globalState.setUserMenuOpenAction(false)}>My List</p>
                        </a>
                        </Link>
                    </div>
                    <div>
                        <p onClick={()=>{switchUser()}} style={{cursor:'pointer'}}>Switch User</p>
                    </div>
                </div>
           </div>
        </div>
    )
}
export default UserMenu
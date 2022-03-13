import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import Link from "next/link"
import { useState } from 'react'

function BrowserMenu(props) {
    const [openMenu, setOpenMenu] = useState(false)

    return(

        //class: any extra class
        // type: background transparent or black border white.."defualt" or "filled"
        <div className={`browser-menu-cont ${props.class}`} onClick={()=>setOpenMenu(!openMenu)} >
            {props.menuTitle}
            <FontAwesomeIcon  icon={faCaretDown} />
            {openMenu && props.children}
        </div>
    )
}
export default BrowserMenu
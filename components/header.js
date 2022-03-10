import Image from "next/image";
import Link from "next/link"
import BrowserMenu from "./Menus/browserMenu";
import DropDownMenu from "./Menus/dropDownMenu";
import MenuItem from "./Menus/menuItem";
const Header = (props) =>
{
   return(
       <header>
           <div className="top-header-cont">
            
            <div className="top-header">
                <div className="top-header-logo">
                <Link href="/">
            <a>
                <h1>POPCORN TIME</h1>
           </a>
           </Link>
                </div>
            
            <div className="top-header-links">
            <Link href="/">
            <a className="links">
                <p>Home</p>
           </a>
           </Link>
           <Link href="/movie">
            <a className="links">
                <p>Movies</p>
           </a>
           </Link>
           <Link href="/tv">
            <a className="links"> 
                <p>TV Shows</p>
           </a>
           </Link>
            </div>

            <BrowserMenu class="top-header-browserMenu" menuTitle="Browse" type="default">
                <DropDownMenu>
                    <MenuItem linkTitle="Home" linkLocation="/"/>
                    <MenuItem linkTitle="Movies" linkLocation="/movie"/>
                    <MenuItem linkTitle="TV Shows" linkLocation="tv"/>
                    <MenuItem linkTitle="My List" linkLocation="#"/>
                </DropDownMenu>
            </BrowserMenu>

         
               </div>

           </div>
         
       </header>
   )
}

export default Header
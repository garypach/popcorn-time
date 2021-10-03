import Image from "next/image";
import Link from "next/link"
const Header = (props) =>
{
   return(
       <header className="top-header">
           <Link href="/">
            <a>
           <h1>POPCORN TIME</h1>
           </a>
           </Link>
       </header>
   )
}

export default Header
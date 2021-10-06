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
       </header>
   )
}

export default Header
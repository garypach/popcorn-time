import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import BrowserMenu from "./Menus/browserMenu";
import DropDownMenu from "./Menus/dropDownMenu";
import MenuItem from "./Menus/menuItem";
import { useStateContext } from "./Provider";
import SearchModal from "./searchModal";
const Header = (props) => {
    const globalState = useStateContext();
  return (
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
            <div className="search-btn">
                <FontAwesomeIcon icon={faSearch} onClick={()=>{globalState.setSearchOpenAction(true)}}/>
            </div>
            <SearchModal/>
          <BrowserMenu class="top-header-browserMenu" menuTitle="Browse">
            <DropDownMenu>
              <MenuItem linkTitle="Home" linkLocation="/" />
              <MenuItem linkTitle="Movies" linkLocation="/movie" />
              <MenuItem linkTitle="TV Shows" linkLocation="tv" />
              <MenuItem linkTitle="My List" linkLocation="/mylist" />
            </DropDownMenu>
          </BrowserMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;

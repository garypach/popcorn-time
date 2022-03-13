import Link from "next/link"
import BrowserMenu from "./Menus/browserMenu"
import DropDownMenu from "./Menus/dropDownMenu"
import MenuItem from "./Menus/menuItem"


const GenreNav = (props) =>
{
   return(
       <div className="genre-nav-cont">
           <div className="genre-nav">
           <BrowserMenu class="genres" menuTitle='Browse Genres'>
        <DropDownMenu>
         { props.genreData.map((item) =>{
        return(
          <MenuItem key={item.id} linkLocation={`/${props.mediaType}/genres/${item.id}`} linkTitle={item.name}/>
        )
        })}
         
        </DropDownMenu>
       </BrowserMenu>

       <ul>
        <GenreList genreData={props.genreData} mediaType={props.mediaType}/>
        <BrowserMenu class="view-more" menuTitle='View More' key="genremenu">
        <DropDownMenu>
         { props.genreData.slice(6).map((item) =>{
        return(
          <MenuItem key={item.id} linkLocation={`/${props.mediaType}/genres/${item.id}`} linkTitle={item.name}/>
        )
        })}
         
        </DropDownMenu>
       </BrowserMenu>
       </ul>
   
           </div>
       </div>
      
       
       
   )
}

const GenreList = (props) =>{
    return props.genreData.slice(0,6).map((item) =>{
        return(
            <li key = {item.id}>
                <Link href={`/${props.mediaType}/genres/${item.id}`}>
                    <a>
                        {item.name}
                    </a>
                </Link>
            </li>
        )
    })
}
export default GenreNav
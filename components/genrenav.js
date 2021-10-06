import Link from "next/link"

const GenreNav = (props) =>
{
   return(
       <ul className="genre-nav">
        <GenreList genreData={props.genreData} mediaType={props.mediaType}/>
       </ul>
   )
}

const GenreList = (props) =>{
    return props.genreData.map((item) =>{
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
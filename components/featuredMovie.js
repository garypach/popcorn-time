import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useStateContext } from './Provider';

const FeaturedMovie = (props) =>
{
  const globalState = useStateContext();

  //myList functions
  const addToList =(props)=>{
   globalState.addToList({id: props.id, mediaType: props.mediatype })
 }
   return(

       <div className="featured-media featured-movie">
           <iframe 
           className="video"
           width="100%" 
           height="100%" 
           src= {props.mediaURL} title={props.title} 
           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen></iframe>
            <div className="featured-media-bg">
        <div className="featured-media-container">
          <div className="featured-media-title">{props.title}</div>
          <div className="featured-media-overview">{props.overview}</div>
          <div className="featured-media-buttons">
            <div className="featured-media-play-btn">
            <FontAwesomeIcon  icon={faPlay} />
            </div>
            <div className="featured-media-play-btn" onClick={() =>{addToList(props)}}>
            <FontAwesomeIcon  icon={faPlus}/>
            </div>
          </div>
        </div>
      </div>
       </div>
   )
}

export default FeaturedMovie
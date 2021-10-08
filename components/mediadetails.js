import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";
import api_key from "../api";

const MediaDetails = (props) =>
{
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadingData,setLoadingData] = useState(true);
    const [media,setMedia] = useState([]);


    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
      fetch(`https://api.themoviedb.org/3/${props.endpoint}?api_key=${api_key}&language=en-US`)
        .then(res => res.json())
        .then(
          (result) => {
            setLoadingData(false);
            setIsLoaded(true);
            setMedia(result);
            console.log(result)
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }, [props.endpoint])

    
  

    const showPoster = (size) => {
        if(loadingData){
            return <Skeleton/>
        }else{
            return (
                <Poster mediaData={media} size = { size } mediatype={media.first_air_date ? props.mediatype == "tv" : props.mediatype == "movie"} key={media.id}/>
            );
        }
    
    };

   return(
       <div className="media-details">
           <div className="media-image">
           <div className="media-poster">
           {showPoster(props.imgSize)}
            </div>
           </div>
           <div className="details">
             <h2 className="media-title">{media.first_air_date ? media.name : media.title}</h2>
             <div className="media-times">
                 <p>{media.first_air_date ? "episodes " : "release date "}{media.first_air_date ? media.number_of_episodes : media.release_date} </p>
                 <p>{media.first_air_date ? " season(s) " : "runtime "}{media.first_air_date ? media.number_of_seasons : media.runtime}{media.first_air_date ? "" : "m"}</p>
             </div>
             <div className="media-overview">
                 <p>Overview</p>
                 <p>{media.overview}</p>
             </div>
           </div>           
       </div>
   )
}

const Poster = (props) => {
    const posterSize = (size)=>{
        if(size === 'large-v'){
            return '500';
        }
        if(size === 'small-v'){
            return '185';
        }
        if(size === 'large-h'){
            return '780';
        }
        if(size === 'small-h'){
            return '342';
        }
    };
    return(
  <div className="mediadetails-poster">
                <Image 
                src={`https://image.tmdb.org/t/p/w${posterSize(props.size)}${props.mediaData.poster_path}`}
                alt="poster"
                width={`${posterSize(props.size)}px`}
                height="100%"
                ></Image>
        </div>
      
      
    )
}
const Skeleton = () => {
    return(
        <div className="poster-skeleton">
            <div className="skeleton-img"></div>
        </div>
    )
}

export default MediaDetails
import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";
import api_key from "../api";
import { shuffle } from "./util/utilityfunctions";
import Link from "next/link"
import { loopposter } from "./util/utilityfunctions";

const MediaRow = (props) =>
{
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadingData,setLoadingData] = useState(true);
    const [media,setMedia] = useState([]);


    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
      fetch(`https://api.themoviedb.org/3/${props.endpoint}&api_key=${api_key}`)
        .then(res => res.json())
        .then(
          (result) => {
            setLoadingData(false);
            setIsLoaded(true);
            setMedia(shuffle(result.results));
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
            return loopposter((<Skeleton/>),10) 
        }else{
            return (
                  media.map(mediaresult => (
                    <Poster mediaData={mediaresult} size = { size } mediatype={mediaresult.first_air_date ? "tv" : "movie"} key={mediaresult.id}/>
                  ))
              );
        }
    
    };
    

   return(
       <div className={`mediarow ${props.imgSize}`}>
           <h3 className="mediarow-title">{props.title}</h3>
           <div className="mediarow-posters">
               {showPoster(props.imgSize)}
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
        <Link href={`/${props.mediatype}/${props.mediaData.id}`}>
              <a>
  <div className="mediarow-poster">
                <Image 
                src={`https://image.tmdb.org/t/p/w${posterSize(props.size)}${props.mediaData.poster_path}`}
                alt="poster"
                width={`${posterSize(props.size)}px`}
                height="100%"
                ></Image>
        </div>
        </a>
        </Link>
      
      
    )
}
const Skeleton = () => {
    return(
        <div className="poster-skeleton">
            <div className="skeleton-img"></div>
        </div>
    )
}

export default MediaRow
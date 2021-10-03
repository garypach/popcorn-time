import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";
import api_key from "../api";
import { shuffle } from "./util/utilityfunctions";
import Link from "next/link"

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
    }, [])

    const loopposter = (comp,digit) => {
        let poster =[];
        for(let index = 0; index <= digit; index++){
            poster.push(comp);
        }
        return poster;
    };
    
  

    const showPoster = () => {
        if(loadingData){
            return loopposter((<Skeleton/>),10) 
        }else{
            return (
                  media.map(mediaresult => (
                    <Poster mediaData={mediaresult} key={mediaresult.id}/>
                  ))
              );
        }
    
    };
    
   return(
       <div className="mediarow">
           <h3 className="mediarow-title">{props.title}</h3>
           <div className="mediarow-posters">
               {showPoster()}
            </div>
           
       </div>
   )
}

const Poster = (props) => {
    return(
        <Link href={`/movie/${props.mediaData.id}`}>
              <a>
  <div className="mediarow-poster">
                <Image 
                src={`https://image.tmdb.org/t/p/original${props.mediaData.poster_path}`}
                alt="poster"
                width="100%"
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
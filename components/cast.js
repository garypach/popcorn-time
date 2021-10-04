import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";
import api_key from "../api";
import { shuffle } from "./util/utilityfunctions";
import Link from "next/link"
import { loopposter } from "./util/utilityfunctions";



const CastInfo= (props) =>
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
            setMedia(result.cast);
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

    const showCast = () => {
      if(loadingData){
          return loopposter((<Skeleton/>),10) 
      }else{
          return (
                media.slice(0, 15).map(mediaresult => (
                  <Cast mediaData={mediaresult} key={mediaresult.id} castName={mediaresult.name} character={mediaresult.character}/>
                ))
            );
      }
  
  };

    return(
      <div className="mediarow">
           <h3 className="mediarow-title">{props.title}</h3>
           <div className="mediarow-posters">
               {showCast()}
            </div>
       </div>
  )
}

const Cast = (props) => {
   const castImage =()=>{
      if(props.mediaData.profile_path===null){
         return <Skeleton/>
      }
      else{
         return  (<Image
         src={`https://image.tmdb.org/t/p/original${props.mediaData.profile_path}`}
         alt="poster"
         width="100%"
         height="100%"
       ></Image>)
      }
   }
 
  return (
    <a>
      <div className="mediarow-poster">
        <div>
         {castImage()}
          <div> {props.character} </div>
          <div> {props.castName} </div>
        </div>
      </div>
    </a>
  );
};


const Skeleton = () => {
   return(
       <div className="poster-skeleton">
           <div className="skeleton-img"></div>
       </div>
   )
}



export default CastInfo
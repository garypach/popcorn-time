import Image from "next/image";
import { useRef, useState } from "react";
import { useEffect } from "react";
import api_key from "../api";
import { shuffle } from "./util/utilityfunctions";
import Link from "next/link"
import { loopposter } from "./util/utilityfunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";



const CastInfo= (props) =>
{
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadingData,setLoadingData] = useState(true);
    const [media,setMedia] = useState([]);

    const { width } = useWindowDimensions();
    //window width
    function getWindowDimensions() {
      const { innerWidth: width} = window;
      return {
        width   
       };
    }
    function useWindowDimensions() {
      const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    
      useEffect(() => {
        function handleResize() {
          setWindowDimensions(getWindowDimensions());
        }
    
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);
    
      return windowDimensions;
    }
    //scroll left and right with buttons
    const ref = useRef(null);
    const scroll = (scrollMobile,scrollTablet,scrollDesktop) => {
      let distance = ref.current.getBoundingClientRect().x - 200
      if(width < 440){
        ref.current.scrollLeft += scrollMobile + distance;
      }
      else if(width > 440 && width < 768){
        ref.current.scrollLeft += scrollTablet + distance;
  
      }
      else{
        ref.current.scrollLeft += scrollDesktop + distance;
      }
    };
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
      <div className="cast-container">
    <div className="cast-container-title">
        <h3>Cast</h3>
        </div>           
        <div className="cast-list-parent" >
        <ul className={`cast-wrapper`} ref={ref}>
        {showCast()}
        </ul>
        <button className="cast-left" onClick={() => scroll(-155,-155,-1050)}><FontAwesomeIcon icon={faChevronLeft} /></button>
        <button className="cast-right" onClick={() => scroll(520,520,1050)}><FontAwesomeIcon icon={faChevronRight} /></button>
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
         return  (
         <Image
         src={`https://image.tmdb.org/t/p/original${props.mediaData.profile_path}`}
         alt="poster"
         width={300}
         height={300}
       ></Image>)
      }
   }
 
  return (
    <li className="cast">
    {castImage()}
    <div className="image-overlay"></div>       
    <div className="cast-info">
          <div className="cast-char">{props.character}</div>
          <div className="cast-name">{props.castName}</div>
        </div>
    </li>
  );
};


const Skeleton = () => {
   return(
       <div className="cast-skeleton">
           <div className="cast-skeleton-img"></div>
       </div>
   )
}



export default CastInfo
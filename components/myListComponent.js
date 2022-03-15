import Image from "next/image";
import { useRef, useState } from "react";
import { useEffect } from "react";
import api_key from "../api";
import { shuffle } from "./util/utilityfunctions";
import Link from "next/link";
import { loopposter } from "./util/utilityfunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faPlay, faTimes } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useStateContext } from "./Provider";
import useWindowDimensions from "./util/windowWidth";
import ls from 'local-storage';


const  MyListComponent = (props) => {
  const globalState = useStateContext();
  const showPoster = (size) => {

      return(
    globalState.myList ?  globalState.myList.map((item) => (
      <Poster
        mediatype={item.mediaType}
        id={item.id}
        key={item.id}
        endpoint={`${item.mediaType}/${item.id}`}
      />
    )) : ''
    
    )
  };

  return (
    <div className={`my-list-posters-container `}>
        <div className="my-list-posters-container-title">
        <h3>My List</h3>
        </div>
        <div className="my-list-posters-list-parent" >
        <ul className={`my-list-posters-wrapper`}>
        {showPoster()}
        </ul>
        </div>
    </div>
  );
};

const Poster = (props) => {
  const globalState = useStateContext();

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [media, setMedia] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/${props.endpoint}?api_key=${api_key}&language=en-US`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setLoadingData(false);
          setIsLoaded(true);
          setMedia(result);
          console.log(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [props.endpoint]);
  return (
   
        <li className="my-list-poster" key={props.id}>
           <Link href={`/${props.mediatype}/${props.id}`} >
        <a>
          <Image
            src={`https://image.tmdb.org/t/p/w500${
              media.poster_path
            }`}
            alt="poster"
            width={350}
            height={200}
          ></Image>
          <div className="image-overlay"></div>       
          </a>
        </Link>
          <div className="my-list-poster-hover-cont">
            <div className="my-list-poster-hover-wrapper">
            <Link href={`/${props.mediatype}/${props.id}`}>
                <a className="my-list-poster-hover-title">
              <div >{media.title ? media.title : media.name}</div>
              </a>
                  </Link>
                <div className="my-list-poster-hover-buttons">
                <Link href={`/${props.mediatype}/${props.id}`}>
                <a>
                <div className="play-btn">
           
                  <FontAwesomeIcon icon={faPlay} />
                 
                </div>
                </a>
                  </Link>
                <div className="remove-btn" onClick={()=>globalState.removeFromList(media.id)} >
                  <FontAwesomeIcon icon={faTimes} />
                </div>
              </div>
             
            </div>
          </div>
        </li>
      
     
  );
};
export default MyListComponent;

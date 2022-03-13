import Image from "next/image";
import { useRef, useState } from "react";
import { useEffect } from "react";
import api_key from "../api";
import { shuffle } from "./util/utilityfunctions";
import Link from "next/link";
import { loopposter } from "./util/utilityfunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faPlay } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const MediaRow = (props) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [media, setMedia] = useState([]);
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
    fetch(`https://api.themoviedb.org/3/${props.endpoint}&api_key=${api_key}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setLoadingData(false);
          setIsLoaded(true);
          setMedia(shuffle(result.results));
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

  const showPoster = (size) => {
    if (loadingData) {
      return loopposter(<Skeleton />, 10);
    } else {
      return media.map((mediaresult) => (
        <Poster
          mediaData={mediaresult}
          size={size}
          mediatype={mediaresult.first_air_date ? "tv" : "movie"}
          key={mediaresult.id}
        />
      ));
    }
  };

  return (
    <div className={`posters-container`}>
        <div className="posters-container-title">
        <h3>{props.title}</h3>
        </div>
        <div className="posters-list-parent" >
        <ul className={`posters-wrapper`} ref={ref}>
        {showPoster(props.imgSize)}
        </ul>
        <button className="poster-left" onClick={() => scroll(-155,-155,-1050)}><FontAwesomeIcon icon={faChevronLeft} /></button>
        <button className="poster-right" onClick={() => scroll(520,520,1050)}><FontAwesomeIcon icon={faChevronRight} /></button>
        </div>
       
    </div>
  );
};

const Poster = (props) => {
//   const posterSize = (size) => {
//     if (size === "large-v") {
//       return "500";
//     }
//     if (size === "small-v") {
//       return "185";
//     }
//     if (size === "large-h") {
//       return "780";
//     }
//     if (size === "small-h" || size === "small-genre") {
//       return "342";
//     }
//   };
  return (
    <Link href={`/${props.mediatype}/${props.mediaData.id}`} key={props.key}>
        <a>
        <li className="poster">
          <Image
            src={`https://image.tmdb.org/t/p/w500${
              props.mediaData.poster_path
            }`}
            alt="poster"
            width={350}
            height={200}
          ></Image>
          <div className="image-overlay"></div>       
          <div className="poster-hover-cont">
            <div className="poster-hover-wrapper">
              <div className="poster-hover-title">{props.mediaData.title ? props.mediaData.title : props.mediaData.name}</div>

                <div className="poster-hover-buttons">
                <div className="play-btn">
                  <FontAwesomeIcon icon={faPlay} />
                </div>
                <div className="add-btn">
                  <FontAwesomeIcon icon={faPlus} />
                </div>
              </div>
             
            </div>
          </div>
        </li>
        </a>
        
        </Link>
     
  );
};
const Skeleton = () => {
  return (
     <li>
         <div  className="skeleton-img">
         </div>
     </li>
  );
};

MediaRow.propTypes = {
  page: PropTypes.oneOf(["default", "genre"]),
  title: PropTypes.string,
  imgSize: PropTypes.oneOf(["small-v", "small-h", "large-v", "large-h"]),
  endpoint: PropTypes.string,
};

MediaRow.defaultProps = {
  mediatype: "movie",
  page: "default",
  title: "Movies",
  imgSize: "small-v",
  endpoint:
    "trending/all/day??&language=en-US&sort_by=popularity.desc&include_video=true",
};
export default MediaRow;

import { useStateContext } from "../components/Provider";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import api_key from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faTimes } from "@fortawesome/free-solid-svg-icons";

const SearchModal = (props) => {
  const globalState = useStateContext();
  const [popData, setPopData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [text, setText] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        let popData = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?primary_release_year=2021&api_key=${api_key}&language=en-US`
        );
        setPopData(popData.data.results.filter((item, i) => i < 12));
        setShowResults(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (globalState.searchOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [globalState.searchOpen]);

  const handleInput = async (e) => {
    try {
      setText(e.target.value);
      let searchData = await axios.get(
        `https://api.themoviedb.org/3/search/multi?query=${e.target.value}&api_key=${api_key}&language=en-US`
      );
      setSearchData(
        searchData.data.results.filter(
          (item, i) => item.media_type === "tv" || item.media_type === "movie"
        )
      );
      setShowResults(true);
    } catch (error) {
      console.log(error);
    }
  };

  const clickedThumbnail = (type, id, media_type) => {
    if (type === "popular") {
      router.push(`/movie/${id}`);
      globalState.setSearchOpenAction(!globalState.searchOpen);
    }
    if (type === "search") {
      router.push(`/${media_type}/${id}`);
      globalState.setSearchOpenAction(!globalState.searchOpen);
    }
  };

  return (
    <div
      className={`search-modal-parent ${
        globalState.searchOpen ? "search-modal-parent--active" : ""
      }`}
    >
      <div className={`search-modal`}>
        <div className="search-modal-input-group ">
          <input
            className="search-modal-input"
            type="text"
            placeholder="Search"
            onChange={handleInput}
            value={text}
          />
          <div
            className="search-modal-close-btn"
            onClick={() =>
              globalState.setSearchOpenAction(!globalState.searchOpen)
            }
          >
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>

        <div className="search-modal-title">
          <h3>
            {showResults && searchData.length >= 1
              ? `Search Result for ${text}`
              : "Popular Searches"}
          </h3>
        </div>

        <div className="search-modal-thumbnails-parent">
          <div className="search-modal-thumbnails">
            {showResults && searchData.length >= 1 ? (
              <SearchResults
                searchData={searchData}
                clickedThumbnail={clickedThumbnail}
              />
            ) : (
              <PopularResults
                popData={popData}
                clickedThumbnail={clickedThumbnail}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const PopularResults = (props) => {
  return props.popData.map((item, index) => {
    return (
      <div
        key={index}
        className="search-modal-thumbnail"
        onClick={() => props.clickedThumbnail("popular", item.id)}
      >
        <Image
          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
          width={500}
          height={500}
          alt="poster"
        ></Image>
        <div className="image-overlay"></div>
        <div className="thumbnail-hover-cont">
          <div className="thumbnail-hover-wrapper">
              <div className="play-btn">
                <FontAwesomeIcon icon={faPlay} />
              </div>
          </div>
        </div>
      </div>
    );
  });
};

const SearchResults = (props) => {
  return props.searchData.map((item, index) => {
    return (
      <div
        key={index}
        className="search-modal-thumbnail"
        onClick={() =>
          props.clickedThumbnail("search", item.id, item.media_type)
        }
      >
        <Image
          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
          width={500}
          height={500}
          alt={item.media_type === 'movie' ? item.title : item.name}
        ></Image>
     <div className="image-overlay"></div>
        <div className="thumbnail-hover-cont">
          <div className="thumbnail-hover-wrapper">
              <div className="play-btn">
                <FontAwesomeIcon icon={faPlay} />
              </div>
          </div>
        </div>
      </div>
    );
  });
};

export default SearchModal;

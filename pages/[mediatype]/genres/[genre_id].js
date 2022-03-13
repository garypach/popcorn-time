import Image from 'next/image'
import FeaturedVideo from '../../../components/featured'
import MainLayout from '../../../components/mainlayout'
import MediaRow from '../../../components/mediarow'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useState } from 'react'
import api_key from '../../../api'
import LazyLoad from 'react-lazyload'
import Skeleton from '../../../components/skeleton'
import GenreNav from '../../../components/genrenav'
import axios from 'axios'
import { shuffle } from '../../../components/util/utilityfunctions'
export default function Index(props){
  const router = useRouter()
  const { id } = router.query

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [media,setMedia] = useState([]);


  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/${props.query.mediatype}/${props.genreData.id}/videos?api_key=${api_key}`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setMedia(result.results);
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
  }, [props.query.mediatype,props.genreData.id])
 const onekey = media
            .map(keys=>keys.key);
  shuffle(onekey);
  



  const showRandomMedia = () => {
    return (
      <>
       <LazyLoad height={100} offset={100} placeholder={<Skeleton/>} >
       <MediaRow page="default" imgSize="small-h"title={``} endpoint ={`discover/${props.query.mediatype}?with_genres=${props.query.genre_id}&language=en-US&sort_by=popularity.desc&include_video=true&primary_release_year=2021&page=1`}/>
       </LazyLoad>
       <LazyLoad height={100} offset={100} placeholder={<Skeleton/>} >
       <MediaRow page="default" imgSize="small-genre"title={``} endpoint ={`discover/${props.query.mediatype}?with_genres=${props.query.genre_id}&language=en-US&sort_by=popularity.desc&include_video=true&primary_release_year=2021&page=2`}/>
       </LazyLoad>
       <LazyLoad height={100} offset={100} placeholder={<Skeleton/>}>
       <MediaRow page="default" imgSize="small-genre"title={``} endpoint ={`discover/${props.query.mediatype}?with_genres=${props.query.genre_id}&language=en-US&sort_by=popularity.desc&include_video=true&primary_release_year=2021&page=3`}/>
       </LazyLoad>
       <LazyLoad height={100} offset={100} placeholder={<Skeleton/>}>
       <MediaRow page="default" imgSize="small-genre"title={``} endpoint ={`discover/${props.query.mediatype}?with_genres=${props.query.genre_id}&language=en-US&sort_by=popularity.desc&include_video=true&primary_release_year=2021&page=4`}/>
       </LazyLoad>
      </>
     
       
    )
  }
  
  return (
    <MainLayout>
       <FeaturedVideo mediaURL={`https://www.youtube.com/embed/${onekey[0]}?autoplay=1&loop=1&start=1&mute=1&playlist=${onekey[0]}`} title={props.genreData.name ? props.genreData.name : props.genreData.title} overview={props.genreData.overview}/>
       <GenreNav mediaType={props.query.mediatype} genreData={props.mediaData}/>
       <p className="genreheading">{props.genreData.name ? "TV Shows" : "Movies"}</p>
       {showRandomMedia()}
    </MainLayout>
  )
}

export async function getServerSideProps(context) {
  let mediaData;
  let genreData;
  try{
    mediaData = await axios.get(`https://api.themoviedb.org/3/genre/${context.query.mediatype}/list?api_key=${api_key}`);
    console.log(mediaData)
    genreData = await axios.get(`https://api.themoviedb.org/3/discover/${context.query.mediatype}?with_genres=${context.query.genre_id}&language=en-US&sort_by=popularity.desc&include_video=true&primary_release_year=2021&api_key=${api_key}`);
    console.log(genreData)

  }catch(error){
    console.log(error);
  }
  // Pass data to the page via props
  return { props: {query: context.query, mediaData: mediaData.data.genres, genreData: shuffle(genreData.data.results)[0]} }
}
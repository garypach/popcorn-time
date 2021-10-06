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
export default function Index(props){
  const router = useRouter()
  const { id } = router.query

  // const [error, setError] = useState(null);
  // const [isLoaded, setIsLoaded] = useState(false);
  // const [media,setMedia] = useState([]);

  // // Note: the empty deps array [] means
  // // this useEffect will run once
  // // similar to componentDidMount()
  // useEffect(() => {
  //   fetch(`https://api.themoviedb.org/3/genre/${props.query.mediatype}/list?api_key=${api_key}`)
  //     .then(res => res.json())
  //     .then(
  //       (result) => {
  //         setIsLoaded(true);
  //         setMedia(result.genres);
  //         console.log(result)
  //       },
  //       // Note: it's important to handle errors here
  //       // instead of a catch() block so that we don't swallow
  //       // exceptions from actual bugs in components.
  //       (error) => {
  //         setIsLoaded(true);
  //         setError(error);
  //       }
  //     )
  // }, [])
  

  const showRandomMedia = () => {
    return props.mediaData.map((item, index)=>(
      <LazyLoad height={200} offset={100} placeholder={<Skeleton/>} key = {index}>
       <MediaRow title={``} endpoint ={`discover/${props.query.mediatype}?with_genres=${props.query.genre_id}&language=en-US&sort_by=popularity.desc&include_video=true&primary_release_year=2021${pageCount()}`}/>
       </LazyLoad>
    ))
  }
  
  return (
    <MainLayout>
       <FeaturedVideo mediaURL="https://www.youtube.com/embed/8hjB6UJ2kMU?autoplay=1&loop=1&start=1&mute=1" title="Jurrassic Park"/>
       <GenreNav mediaType={props.query.mediatype} genreData={props.mediaData}/>
       {showRandomMedia()}
    </MainLayout>
  )
}

export async function getServerSideProps(context) {
  let mediaData;
  try{
    mediaData = await axios.get(`https://api.themoviedb.org/3/genre/${context.query.mediatype}/list?api_key=${api_key}`);
    console.log(mediaData)
  }catch(error){
    console.log(error);
  }
  // Pass data to the page via props
  return { props: {query: context.query, mediaData: mediaData.data.genres,} }
}
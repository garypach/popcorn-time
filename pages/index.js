import Image from 'next/image'
import { useEffect } from 'react'
import { useState } from 'react'
import api_key from '../api'
import { shuffle } from '../components/util/utilityfunctions'
import axios from 'axios'
import Home from '../components/home'
import FeaturedVideo from '../components/featured'
import MainLayout from '../components/mainlayout'

export default function Index(props) {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [media,setMedia] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${props.videoData.id}/videos?api_key=${api_key}`)
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
  }, [props.videoData.id])
 const onekey = media
            .map(keys=>keys.key);
  shuffle(onekey);

  return (
    <MainLayout>
    <FeaturedVideo mediaURL={`https://www.youtube.com/embed/${onekey[0]}?autoplay=1&loop=1&start=1&mute=1&playlist=${onekey[0]}`} title={props.videoData.title}/>
    <Home/>
    </MainLayout>
  )
}

export async function getServerSideProps() {
  let videoData;
  try{
    videoData = await axios.get(`https://api.themoviedb.org/3/discover/movie?&language=en-US&sort_by=popularity.desc&include_video=true&api_key=${api_key}`);
    console.log(videoData)

  }catch(error){
    console.log('error');

    console.log(error);
  }
  // Pass data to the page via props
  return { props: {videoData: shuffle(videoData.data.results)[0]} }
}
import Head from 'next/head'
import Image from 'next/image'
import CastInfo from '../../components/cast'
import FeaturedVideo from '../../components/featured'
import MainLayout from '../../components/mainlayout'
import MediaRow from '../../components/mediarow'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useState } from 'react'
import api_key from '../../api'

export default function SingleMediaPage(props) {
    const router = useRouter()
    const { id } = router.query

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [media,setMedia] = useState([]);


    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
      fetch(`https://api.themoviedb.org/3/movie/${props.query.id}/videos?api_key=${api_key}`)
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
    }, [])

      
  return (
    <MainLayout>
        <h1>{media.title}</h1>
       <FeaturedVideo video="https://www.youtube.com/embed/aYSy8guUUV0?autoplay=1&loop=1&start=1&mute=1" title="Jurrassic Park"/>
       <MediaRow title="What's Trending?" endpoint ="trending/all/day??&language=en-US&sort_by=popularity.desc&include_video=true"/>
        <CastInfo/>
    </MainLayout>
  )
}

export async function getServerSideProps(context) {
    // Pass data to the page via props
    return { props: {query: context.query} }
  }
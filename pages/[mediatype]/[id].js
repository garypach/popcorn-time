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
import { shuffle } from '../../components/util/utilityfunctions'
import LazyLoad from 'react-lazyload'
import Skeleton from '../../components/skeleton'
import MediaDetails from '../../components/mediadetails'

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
      fetch(`https://api.themoviedb.org/3/${props.query.mediatype}/${props.query.id}/videos?api_key=${api_key}`)
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
    }, [props.query.mediatype,props.query.id])
   const onekey = media
              .map(keys=>keys.key);
    shuffle(onekey);
    return (
    <MainLayout>
        <h1>{media.title}</h1>
       <FeaturedVideo 
       mediaURL={`https://www.youtube.com/embed/${onekey[0]}?autoplay=1&loop=1&start=1&mute=1&playlist=${onekey[0]}`} 
       title=""
       />
       <MediaDetails endpoint={`${props.query.mediatype}/${props.query.id}`}/>
       <LazyLoad height={200} offset={-200} placeholder={<Skeleton/>}>    
       <CastInfo endpoint={`${props.query.mediatype}/${props.query.id}/credits`}/>
       </LazyLoad> 
       <LazyLoad height={200} offset={-200} placeholder={<Skeleton/>}>    
       <MediaRow title="Simalar To This" endpoint = {`${props.query.mediatype}/${props.query.id}/similar?&language=en-US&sort_by=popularity.desc&include_video=true`}/>
       </LazyLoad> 
    </MainLayout>
  )
}

export async function getServerSideProps(context) {
    // Pass data to the page via props
    return { props: {query: context.query} }
  }
import Head from 'next/head'
import Image from 'next/image'
import FeaturedVideo from '../components/featured'
import MainLayout from '../components/mainlayout'
import MediaRow from './mediarow'
import LazyLoad from 'react-lazyload';
import Skeleton from './skeleton'

const Home = (props) => {
  return (
    <MainLayout>
       <FeaturedVideo mediaURL="https://www.youtube.com/embed/8hjB6UJ2kMU?autoplay=1&loop=1&start=1&mute=1" title="Jurrassic Park"/>
       <LazyLoad height={200} offset={200} placeholder={<Skeleton/>}>
       <MediaRow title="What's Trending?" endpoint ="trending/all/day??&language=en-US&sort_by=popularity.desc&include_video=true"/>
       </LazyLoad>
       <LazyLoad height={200} offset={-200} placeholder={<Skeleton/>}>    
       <MediaRow title="Popular Movies" endpoint ="discover/movie?&language=en-US&sort_by=popularity.desc&include_video=true"/>
       </LazyLoad>
       <LazyLoad height={200} offset={-200} placeholder={<Skeleton/>}>
       <MediaRow title="Popular TV Shows" endpoint ="discover/tv?&language=en-US&sort_by=popularity.desc&include_video=true"/>
       </LazyLoad>
       <LazyLoad height={200} offset={-200} placeholder={<Skeleton/>}>
       <MediaRow title="Action" endpoint ="discover/movie?&language=en-US&with_genres=28&sort_by=popularity.desc&include_video=true&primary_release_year=2021"/>
       </LazyLoad>
       <LazyLoad height={200} offset={-200} placeholder={<Skeleton/>}>
       <MediaRow title="Adventure" endpoint ="discover/movie?&language=en-US&with_genres=12&sort_by=popularity.desc&include_video=true&primary_release_year=2021"/>
       </LazyLoad>
       <LazyLoad height={200} offset={-200} placeholder={<Skeleton/>}>
       <MediaRow title="Animated Movies" endpoint ="discover/movie?&language=en-US&with_genres=16&sort_by=popularity.desc&include_video=true&primary_release_year=2021"/>
       </LazyLoad>
       <LazyLoad height={200} offset={-200} placeholder={<Skeleton/>}>
       <MediaRow title="Animated TV Shows" endpoint ="discover/tv?&language=en-US&with_genres=16&sort_by=popularity.desc&include_video=true&primary_release_year=2021"/>
       </LazyLoad>
    </MainLayout>
  )
}

export default Home
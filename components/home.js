import Image from 'next/image'
import MediaRow from '../components/mediarow'
import LazyLoad from 'react-lazyload'
import Skeleton from '../components/skeleton'

const Home = (props) => {
  return (
    <>
       <LazyLoad height={200} offset={200} placeholder={<Skeleton/>}>
       <MediaRow imgSize = 'large-v' title="What's Trending?" endpoint ="trending/all/day??&language=en-US&sort_by=popularity.desc&include_video=true"/>
       </LazyLoad>
       <LazyLoad height={200} offset={-200} placeholder={<Skeleton/>}>    
       <MediaRow imgSize = "large-h" title="Popular Movies" endpoint ="discover/movie?&language=en-US&sort_by=popularity.desc&include_video=true"/>
       </LazyLoad>
       <LazyLoad height={200} offset={-200} placeholder={<Skeleton/>}>
       <MediaRow imgSize = "large-h" title="Popular TV Shows" endpoint ="discover/tv?&language=en-US&sort_by=popularity.desc&include_video=true"/>
       </LazyLoad>
       <LazyLoad height={200} offset={-200} placeholder={<Skeleton/>}>
       <MediaRow imgSize = "small-v" title="Action" endpoint ="discover/movie?&language=en-US&with_genres=28&sort_by=popularity.desc&include_video=true&primary_release_year=2021"/>
       </LazyLoad>
       <LazyLoad height={200} offset={-200} placeholder={<Skeleton/>}>
       <MediaRow imgSize = "small-v"  title="Adventure" endpoint ="discover/movie?&language=en-US&with_genres=12&sort_by=popularity.desc&include_video=true&primary_release_year=2021"/>
       </LazyLoad>
       <LazyLoad height={200} offset={-200} placeholder={<Skeleton/>}>
       <MediaRow imgSize = "small-v" title="Animated Movies" endpoint ="discover/movie?&language=en-US&with_genres=16&sort_by=popularity.desc&include_video=true&primary_release_year=2021"/>
       </LazyLoad>
       <LazyLoad height={200} offset={-200} placeholder={<Skeleton/>}>
       <MediaRow imgSize = "small-v" title="Animated TV Shows" endpoint ="discover/tv?&language=en-US&with_genres=16&sort_by=popularity.desc&include_video=true&primary_release_year=2021"/>
       </LazyLoad>
       </>
  );
};

export default Home
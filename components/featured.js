
const FeaturedVideo = (props) =>
{
   return(
       <div className="featured-media">
           <iframe 
           className="video"
           width="100%" 
           height="100%" 
           src="https://www.youtube.com/embed/8hjB6UJ2kMU?autoplay=1&loop=1&start=1&mute=1" title="Jurrassic Park" 
           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen></iframe>
       </div>
   )
}

export default FeaturedVideo
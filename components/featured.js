
const FeaturedVideo = (props) =>
{
   return(
       <div className="featured-media">
           <iframe 
           className="video"
           width="100%" 
           height="100%" 
           src= {props.video} title={props.title} 
           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen></iframe>
       </div>
   )
}

export default FeaturedVideo
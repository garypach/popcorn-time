
const Skeleton = (props) =>
{

    const loopposter = (comp,digit) => {
        let poster =[];
        for(let index = 0; index <= digit; index++){
            poster.push(comp);
        }
        return poster;
    };
    
   return(
       <div className="mediarow">
           <h3 className="mediarow-title">{props.title}</h3>
           <div className="mediarow-posters">
               {loopposter((<div className="poster-skeleton">
            <div className="skeleton-img"></div>
        </div>),10)}
            </div>
           
       </div>
   )
}

export default Skeleton
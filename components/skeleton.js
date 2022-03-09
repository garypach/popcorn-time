
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
    <div className={`posters-container`}>
    <ul className={`posters-wrapper`}>
    {loopposter((
    <li>
        <div  className="skeleton-img">
        </div>
    </li>
   ),10)}
    </ul>
</div>
   )
}


export default Skeleton
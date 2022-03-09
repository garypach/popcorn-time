import Header from "./header"
import PropTypes from 'prop-types'
const MainLayout = (props) =>
{
   return(<div style={{ minHeight:'100vh', background: 'rgb(15, 30, 50)', height:'100%'}}
    >
   <Header />
    <section className="content-container" >
        {props.children}
    </section>
   </div>)
}

export default MainLayout
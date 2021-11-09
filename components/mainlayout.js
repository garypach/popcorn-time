import Header from "./header"
import PropTypes from 'prop-types'
const MainLayout = (props) =>
{
   return(<div style={{ background: 'rgb(48,123,207)',
    background: 'linear-gradient(135deg, rgb(0,0,0,1) 60%, rgb(48,123,207,1) 80%, rgba(62,185,62,1) 100%)', minHeight:'100vh', }}
    >
   <Header />
    <section className="content-container">
        {props.children}
    </section>
   </div>)
}

export default MainLayout
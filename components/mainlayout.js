import Header from "./header"
const MainLayout = (props) =>
{
   return(<div style={{ background: 'rgb(48,123,207)',
    background: 'linear-gradient(135deg, rgb(48,123,207,1) 0%, rgb(48,123,207,1) 50%, rgba(62,185,62,1) 100%, rgba(200,200,200,1) 100%)', minHeight:'100vh' }}
    >
   <Header />
    <section className="content-container">
        {props.children}
    </section>
   </div>)
}

export default MainLayout
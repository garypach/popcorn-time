import Header from "./header"
const MainLayout = (props) =>
{
   return(<div style={{ background: 'rgb(2,0,36)',
    background: 'linear-gradient(135deg, rgba(2,0,36,1) 0%, rgba(28,231,131,1) 0%, rgba(62,185,62,1) 100%, rgba(200,200,200,1) 100%)', minHeight:'100vh' }}
    >
   <Header />
    <section className="content-container">
        {props.children}
    </section>
   </div>)
}

export default MainLayout
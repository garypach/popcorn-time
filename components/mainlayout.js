import Header from "./header"
const MainLayout = (props) =>
{
   return(<div style={{ background: 'rgb(2,0,36)',
    background: 'linear-gradient(333deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 0%, rgba(0,174,255,1) 100%)', minHeight:'100vh' }}
    >
   <Header />
    <section className="content-container">
        {props.children}
    </section>
   </div>)
}

export default MainLayout
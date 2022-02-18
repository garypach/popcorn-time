import '../styles/styles.css'
import {Provider} from '../components/Provider/Provider'
function MyApp({ Component, pageProps }) {
  return (
  <Provider>
    <Component {...pageProps} />
  </Provider>
  
  )
}

export default MyApp

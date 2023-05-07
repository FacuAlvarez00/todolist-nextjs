import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from "react-redux"
import store from "../app/GlobalRedux/store"
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from "../app/components/Navbar/Navbar"
import Footer from '@/app/components/Footer/Footer'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Navbar/>
      <Component {...pageProps} />
     {/*  <Footer/> */}

    </Provider>
    

  )
 
}

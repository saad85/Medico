
import './ui/styles/global.css';
import  './ui/styles/index.css';
import './ui/styles/doctors.css';
import 'react-phone-input-2/lib/style.css'
import "flatpickr/dist/themes/light.css";
import { makeStyles } from '@material-ui/core/styles';

function MyApp({ Component, pageProps }) {

    return <Component {...pageProps} />
  }
  
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  // MyApp.getInitialProps = async (appContext) => {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  //   const appProps = await App.getInitialProps(appContext);
  //
  //   return { ...appProps }
  // }
  
  export default MyApp
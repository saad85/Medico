
import Head from 'next/head';
import Navbar from './navbar';

const layout = (props) => (
 <div>

  <Head>
  
  
      <link rel='stylesheet' href="https://stackpath.bootstrapcdn.com/bootswatch/4.5.0/lumen/bootstrap.min.css"/>
      {/* <link rel='stylesheet' href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"/> */}
      <link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet"/>
      <link href="https://fonts.googleapis.com/css2?family=Oswald&family=Mukta:wght@300;600&display=swap" rel="stylesheet"/>
      
      

  </Head>

  <Navbar/>

   <div>
      {props.children}
   </div>

   <style jsx global>{`
            html,
            body {
              padding: 0;
              margin: 0;
              font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
                Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
                sans-serif;
            }

            * {
              box-sizing: border-box;
            }
            a{

              font-family: 'Oswald', sans-serif;
              color:#127ba3!important;
            }
          `}</style>
 </div>

);

export default layout;

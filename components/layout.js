
import Head from 'next/head';
import Navbar from './navbar';
import CommonHelpers from '../pages/helpers/helper'

const layout = (props) =>{

  let helpers = CommonHelpers() || null ,
      currentUserId = helpers.getCurrentUserId() || null;

      return (
        <div>
       
          <Head>
            <link href="https://stackpath.bootstrapcdn.com/bootswatch/4.5.0/lumen/bootstrap.min.css" rel='stylesheet'/>
            <link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet"/>
            <link href="https://fonts.googleapis.com/css2?family=Oswald&family=Mukta:wght@300;600&display=swap" rel="stylesheet"/>
          </Head>
       
          <Navbar currentUserId={currentUserId}/>
       
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
} 

export default layout;

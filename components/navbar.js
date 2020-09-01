import Link from 'next/link';
import { render } from 'react-dom';
import { Button ,OverlayTrigger,Popover} from 'react-bootstrap';
import CustomPopover from '../components/tools/popover';
import ReactDOM from 'react-dom'


class navbar extends React.Component {
  

  render(){
    return(
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary navbar-container">
        <div className="container">
          <a className="navbar-brand logo-container" href="#"><h4>DocExplorA</h4></a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item nav-link">
                <Link href="/"><a className="nav-link">Home</a></Link>
              </li>
              <li className="nav-item nav-link">
                <Link href="/about"><a className="nav-link">About</a></Link>
              </li>
              <li className="nav-item nav-link">
                <Link href="/about"><a className="nav-link">Administrator</a></Link>
              </li>
              <li className="nav-item dropDown">
                <CustomPopover/>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <style jsx>{`
          a{

            font-family: 'Oswald', sans-serif;
            color:#127ba3!important;
          }

          .dropDown{
            margin-top: 2px;
            cursor:pointer;
            color: #127ba3!important;
          }

          .nav-link{
            margin-right:6px;
            padding:0px;
          }
          
          .logo{
            margin-right:4px;

          }

          .logo-container{
            display:content!important;
          }
          .navbar-container{
            background:white!important;
          }

        `}</style>

    </div>
    );
  }

  

};

export default navbar;

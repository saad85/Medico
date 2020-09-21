import Link from 'next/link';
import { render } from 'react-dom';
import { Button ,OverlayTrigger,Popover} from 'react-bootstrap';
import CustomPopover from '../components/tools/popover';
import ReactDOM from 'react-dom'


class navbar extends React.Component {
  setActiveNavBar =function(e){
    e.preventDefault();

    let target = e.target;


  }

  render(){
    return(
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary navbar-container">
        <div className="container">
          <a className="navbar-brand logo-container" href="#"><h4>Medico</h4></a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
              <li id="home" className="nav-item nav-link" onClick={this.setActiveNavBar}>
                <Link href="/"><a className="nav-link">Home</a></Link>
              </li>
              <li className="nav-item nav-link" onClick={this.setActiveNavBar}>
                <Link href="/ui/about"><a className="nav-link">About</a></Link>
              </li>
              <li className="nav-item nav-link" onClick={this.setActiveNavBar}>
                <Link href="/administrator"><a className="nav-link">Administrator</a></Link>
              </li>
              <li className="nav-item dropDown" onClick={this.setActiveNavBar}>
                <CustomPopover currentUserId = {this.props.currentUserId}/>
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
            margin-top: 16px;
            cursor:pointer;
            color: #127ba3!important;
          }

          .nav-link{
            margin-right:6px;
            padding: 8px;
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

          .active{
            background-color: #127ba3!important;
            color:white!important;
          }

        `}</style>

    </div>
    );
  }

  

};

export default navbar;

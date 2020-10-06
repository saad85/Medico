import { Popover ,OverlayTrigger} from 'react-bootstrap';
import CustomModal from './Modal/modal';
import cookie from 'js-cookie';


class CustomPopover extends React.Component {
  //data
  state={
    isShowLoginModal:false,
    date:new Date(),
    modalType:'',
    show:false
  }
  receiveChildDataAndSetState = (childData) => {
    this.setState({isShowLoginModal: childData.isShowLoginModal})
  }
  //hooks
  componentDidMount=()=>{
    this.setState({isShowLoginModal:false});
  }
  
  //methods

  hidePopOver = ()=>{
    if(typeof window !=='undefined' &&  document.getElementsByClassName("fade show popover bs-popover-bottom")) document.getElementsByClassName("fade show popover bs-popover-bottom")[0].style.display = "none";
  }
  showLoginModal = () =>{

    this.hidePopOver();
    
    this.setState({show:false});

    if(this.props.currentUserId) {
      cookie.remove("token"); 
      location.reload(); 
    
    }
    else this.setState({isShowLoginModal:true});
  }
  showSignUpModal = () =>{
    this.hidePopOver();

    this.setState({isShowLoginModal:true,modalType:"signUp"});
  }

  render(){
    return(
      <div>
        
        <OverlayTrigger trigger="click" placement='bottom' key="bottom" rootClose overlay={ 
            <Popover id={`popover-positioned-bottom`}   bsPrefix="popover">
              <Popover.Content    bsPrefix="custom-popover">
                <div className="dropdown-option"><a>Settings</a></div>
                <div className="dropdown-option" onClick={this.showLoginModal}>
                  {this.props.currentUserId ? <a>Log out</a> : <a>Log in</a>}
                </div>
                {!this.props.currentUserId ? <div className="dropdown-option" onClick={this.showSignUpModal}><a>Sign up</a></div> :null}
            
              </Popover.Content>
            </Popover>}>
            
            <i className="fa fa-caret-down" ></i>
        
        </OverlayTrigger>

        <CustomModal 
          context = "popover"
          show={this.state.isShowLoginModal}  
          modalType={this.state.modalType} 
          sendDataToParent ={this.receiveChildDataAndSetState} 
          setCurrentUserId={this.props.setCurrentUserId}
          size ="sm"/>

        <style jsx>{`
                  a{
                    color:#74797b!important;
                  }
                  .dropdown-option{
                      padding:5px;
                      border-bottom:1px solid #e2eef3;
                      text-align: center;
                      width:100px;
                      color:#797373;
                      cursor:pointer;
                      line-height: 2.5;
                      font-size: 11px;
                      font-weight: bold;
                  }

                  .popover-container{
                      padding:0px!important;
                  }

                  .custom-popover{
                    paddng:0px!important;
                    width: 120px!important;
                  }

        `}</style>
   </div> 
    )
  }
}

export default CustomPopover;
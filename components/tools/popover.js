import { Popover ,OverlayTrigger} from 'react-bootstrap';
import CustomModal from './Modal/modal';
import cookie from 'js-cookie';

class CustomPopover extends React.Component {
  //data
  state={
    isShowLoginModal:false,
    date:new Date(),
    modalType:''
  }
  receiveChildDataAndSetState = (childData) => {
    this.setState({isShowLoginModal: childData.isShowLoginModal})
  }
  //hooks
  componentDidMount=()=>{
    this.setState({isShowLoginModal:false});
  }
  
  //methods
  showLoginModal = () =>{
    if(this.props.currentUserId) cookie.remove("token"); 
    else  this.setState({isShowLoginModal:true});
  }
  showSignUpModal = () =>{
    this.setState({isShowLoginModal:true,modalType:"signUp"});
  }

  render(){
    return(
      <div>
        <OverlayTrigger trigger="click" placement='bottom' key="bottom" rootClose overlay={ 
            <Popover id={`popover-positioned-bottom`}>
              <Popover.Content bsPrefix="custom-popover">
                <div className="dropdown-option"><span>Settings</span></div>
                <div className="dropdown-option" onClick={this.showLoginModal}>
                  {this.props.currentUserId ? <span>Log out</span> : <span>Log in</span>}
                </div>
                {!this.props.currentUserId ? <div className="dropdown-option" onClick={this.showSignUpModal}><span>Sign up</span></div> :null}
            
              </Popover.Content>
            </Popover>}>
            
            <i className="fa fa-caret-down" onClick={this.addPopoverClass}></i>
        
        </OverlayTrigger>

        <CustomModal show={this.state.isShowLoginModal}  modalType={this.state.modalType} sendDataToParent ={this.receiveChildDataAndSetState}/>

        <style jsx>{`
                  .dropdown-option{
                      padding:5px;
                      border-bottom:1px solid #e2eef3;
                      text-align: center;
                      width:100px;
                      color:#797373;
                      cursor:pointer;
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
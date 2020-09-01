import { Popover ,OverlayTrigger} from 'react-bootstrap';
import CustomModal from './Modal/modal';

class CustomPopover extends React.Component {
  //data
  state={
    isShowLoginModal:false,
    date:new Date()
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
    this.setState({isShowLoginModal:true});
  }
  render(){
    return(
      <div>
        <OverlayTrigger trigger="click" placement='bottom' key="bottom" rootClose overlay={ 
            <Popover id={`popover-positioned-bottom`}>
              <Popover.Content bsPrefix="custom-popover">
                <div className="dropdown-option"><a href="#">Settings</a></div>
                <div className="dropdown-option" onClick={this.showLoginModal}><a href="#">Log in</a></div>
                <div className="dropdown-option"><a href="#">Log out</a></div>
              </Popover.Content>
            </Popover>}>
            
            <i className="fa fa-caret-down" onClick={this.addPopoverClass}></i>
        
        </OverlayTrigger>

      <CustomModal show={this.state.isShowLoginModal} sendDataToParent ={this.receiveChildDataAndSetState}/>

        <style jsx>{`
                  .dropdown-option{
                      padding:5px;
                      border-bottom:1px solid #e2eef3;
                      text-align: center;
                      width:100px;
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
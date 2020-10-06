import { Button ,Modal,Popover} from 'react-bootstrap';
import LoginForm from '../../Login-SignUp-Form/login'
import SignUp from '../../Login-SignUp-Form/signUp'
import Login from '../../Login-SignUp-Form/signUp';


function ModalTitle(props){

  let title = 'Log in'; 
  if(props.modalType === 'signUp') title = 'Sign Up'; 

  return <Modal.Title>{title}</Modal.Title>
}

function ModalBody(props){

  let bodyComponent = <LoginForm />;

  if(props.modalType === 'signUp') bodyComponent = <SignUp/>
                
  return <Modal.Body>{bodyComponent} </Modal.Body>
}



class CustomModal extends React.Component{
    //data
    state={
        show:false,
        modalType:'',
        context:'',
        doctorInfo:{}
    }

    //hooks
    UNSAFE_componentWillReceiveProps  = (nextProps) =>{
        const { show ,modalType,appointmentPropsData } = this.props;
        const doctorInfo =  appointmentPropsData && appointmentPropsData.doctorInfo ?appointmentPropsData.doctorInfo : null ;

        if (nextProps.show !==show) this.setState({ show :nextProps.show });
        if (nextProps.modalType !== modalType) this.setState({ modalType :nextProps.modalType });
        if (nextProps.appointmentPropsData &&  nextProps.appointmentPropsData.doctorInfo) this.setState({ doctorInfo :nextProps.appointmentPropsData.doctorInfo });
        if (nextProps.appointmentPropsData &&  nextProps.appointmentPropsData.context) this.setState({context:nextProps.appointmentPropsData.context});
    }

    //methods
    changeModalTypeFromChild =(props) =>{
      this.setState({modalType:'signUp'});
    }
    closeModal=(isShowLoginModalAgain)=>{
      this.setState({show:false}); 
      if(isShowLoginModalAgain) {
        this.setState({modalType:'login'});
        this.setState({show:true});

        isShowLoginModalAgain =false;
        
      } 

      console.log("this.state.show",this.state.show);
    
      if(this.props && this.props.sendDataToParent) this.props.sendDataToParent({isShowLoginModal:false});
    }

    render(){
        return (
            <>
        
              <Modal show={this.state.show} onHide={this.closeModal} size={this.props.size} >
                
                <Modal.Header closeButton className="custom-modal-header">
                    <ModalTitle modalType = {this.state.modalType}/>
                </Modal.Header>

                <Modal.Body> 
                  {this.state.modalType === 'signUp' ? 
                  
                  <SignUp 
                    closeModal={this.closeModal} 
                    showAppointmentModal={this.props.showAppointmentModal}
                    setCurrentUserId={this.props.setCurrentUserId}/> : 

                  <LoginForm 
                    context={this.state.context}
                    reloadPage={this.props.reloadPage}
                    onChangeModalType={this.changeModalTypeFromChild} 
                    closeModal={this.closeModal} 
                    showAppointmentModal={this.props.showAppointmentModal} 
                    setCurrentUserId={this.props.setCurrentUserId}/>}

                </Modal.Body>

              </Modal>

              <style jsx>{`
                  .modal-30w{
                        width:50%!important
                }
                .custom-modal-header{
                  background-color: #cecece2e!important;
                }
                .modal-header{
                    background-color: #cecece2e!important;
                }

              `}</style>

              
            </>
          );
    }
}
  
  export default CustomModal;
  
 
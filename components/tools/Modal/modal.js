import { Button ,Modal,Popover} from 'react-bootstrap';
import LoginForm from '../../Login-SignUp-Form/login'
import SignUp from '../../Login-SignUp-Form/signUp'
import Login from '../../Login-SignUp-Form/signUp';


function ModalTitle(props){

  let title = 'Log in'; 
  if(props.modalType === 'signUp') title = 'Sign Up'; 

  return <Modal.Title><a>{title}</a></Modal.Title>
}

function ModalBody(props){

  console.log("modalType ",props)

  let bodyComponent = <LoginForm />;

  if(props.modalType === 'signUp') bodyComponent = <SignUp/>

  console.log("bodyComponent ",bodyComponent)
                
  return <Modal.Body>{bodyComponent} </Modal.Body>
}



class CustomModal extends React.Component{
    //data
    state={
        show:false,
        modalType:''
    }

    //hooks
    UNSAFE_componentWillReceiveProps  = (nextProps) =>{
        const { show ,modalType } = this.props;

        if (nextProps.show !== show) this.setState({ show :nextProps.show });
        if (nextProps.modalType !== modalType) this.setState({ modalType :nextProps.modalType });
    }

    //methods
    changeModalTypeFromChild =(props) =>{
      console.log(props);

      this.setState({modalType:'signUp'});
    }
    closeModal=()=>{
        this.setState({show:false});
        this.props.sendDataToParent({isShowLoginModal:false});
    }

    render(){
        return (
            <>
        
              <Modal show={this.state.show} onHide={this.closeModal} size={this.props.size} >
                
                <Modal.Header closeButton className="custom-modal-header">
                    <ModalTitle modalType = {this.state.modalType}/>
                </Modal.Header>

                <Modal.Body> 
                  {this.state.modalType === 'signUp' ? <SignUp closeModal={this.closeModal}/> : <LoginForm onChangeModalType={this.changeModalTypeFromChild} closeModal={this.closeModal} />}
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
  
 
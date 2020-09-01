import { Button ,Modal,Popover} from 'react-bootstrap';
import LoginForm from '../../Login-SignUp-Form/login'

class CustomModal extends React.Component{
    //data
    state={
        show:false
    }

    //hooks
    UNSAFE_componentWillReceiveProps  = (nextProps) =>{
        const { show } = this.props;

        if (nextProps.show !== show) this.setState({ show :nextProps.show });
    }

    //methods
    handleClose=()=>{
        this.setState({show:false});
        this.props.sendDataToParent({isShowLoginModal:false});
    }

    render(){
        return (
            <>
        
              <Modal show={this.state.show} onHide={this.handleClose} size="sm" >
                
                <Modal.Header closeButton>
                  <Modal.Title><a>Log in</a></Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    <LoginForm/>
                </Modal.Body>
                
                <Modal.Footer>

                
                </Modal.Footer>
              </Modal>

              <style jsx>{`
                  .modal-30w{
                        width:50%!important
                }

        `}</style>

              
            </>
          );
    }
}
  
  export default CustomModal;
  
 
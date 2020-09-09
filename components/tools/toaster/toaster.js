import { Toast } from "react-bootstrap";
import React, { useState } from "react";

export default function Example(props) {
    let [show, setShow] = useState(true);

    const isShow = props && props.isShow ? props.isShow : false,
    toasterMessage = props && props.toasterMessage ? props.toasterMessage : '';
  
    return (
        <div>
            <div aria-live="polite" aria-atomic="true" style={{minHeight: '200px'}}>
                <div style={{position: 'absolute',top: 40,right: 0,}}>
                    <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
                        <Toast.Body>
                            <span className="toaster-message">{toasterMessage}</span>
                        </Toast.Body>
                    </Toast>
                </div>
            </div>

            <style jsx>{`
                    .toaster-message{
                      font-family: 'Oswald', sans-serif;
                      color:#127ba3;
                    }

          `}</style>
        </div>
    );
  }
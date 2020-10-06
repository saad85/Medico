import { Toast } from "react-bootstrap";
import React, { useState,useEffect } from "react";

export default function Example(props) {
    const [show, setShow] = useState(true);
    const [windowTop, setWindowTop] = useState(0);

    const isShow = props && props.isShow ? props.isShow : false,
    toasterMessage = props && props.toasterMessage ? props.toasterMessage : '';


    useEffect(() => {
        
        if(typeof window !=="undefined") setWindowTop(window.pageYOffset - 45);
        
        
        return () => {}
    }, []);


    return (
        <div>
            <div aria-live="polite" aria-atomic="true" style={{
                position: 'relative',
            }}>
                <div  className="toaster-container" style={{top:windowTop}}>
                    <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
                        <Toast.Body>
                            <span className={ props.textClass+" toaster-message"}>{toasterMessage}</span>
                        </Toast.Body>
                    </Toast>
                </div>
            </div>

            <style jsx>{`
                    .toaster-message{
                      font-family: 'Oswald', sans-serif;
                      color:#127ba3;
                    }
                    .toaster-container{
                        position: absolute;
                        right: 2%;
                        z-index:99999
                    }
                    .warning{
                        color:red!important;
                    }

          `}</style>
        </div>
    );
  }
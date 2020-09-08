import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function addOrLoginUser(event) {
    event.preventDefault();
    if(email && password) createRequest(email,password);
  }

  function setModalType(props) {
    event.preventDefault();
    if(props && props.onChangeModalType) props.onChangeModalType();
  }
  function createRequest(email,password){
    
    fetch('api/users',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:  JSON.stringify({
        email,
        password,
    })});
  }

  return (
    <div className="Login">
      <form onSubmit={addOrLoginUser}>
        <FormGroup controlId="email" >
          <FormLabel> <span className="form-text"> Email</span></FormLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel><span className="form-text"> Password</span></FormLabel>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>

        <div className="sign-up-text"><span>Dont have account? </span><a onClick={()=>setModalType(props)}>Sign up</a></div>

        <Button block  type="submit" className="submit-button" >
          Login
        </Button>
      </form>

      <style jsx>{`
                  .form-text{

                    font-family: 'Oswald', sans-serif;
                    color:#127ba3!important;
                  }
                  .submit-button{
                      font-family: 'Oswald', sans-serif;
                  }
                  .sign-up-text{
                    font-family: 'Oswald', sans-serif;
                    color:#797373;

                    margin-top: -5px;
                    margin-bottom: 6px;
                    font-size: 12px;
                    padding-left: 3px;
                  }

        `}</style>
    </div>
  );
}
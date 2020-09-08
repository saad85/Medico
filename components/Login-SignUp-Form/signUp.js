import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function addOrLoginUser(event) {
    event.preventDefault();
      console.log("name",name, "email",email,"password",password);

      createRequest(name,email,password);
  }
  function createRequest(name,email,password){
    
    fetch('api/users',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:  JSON.stringify({
        name,
        email,
        password,
    })});
  }

  return (
    <div className="signIn">
      <form onSubmit={addOrLoginUser}>
      <FormGroup controlId="name" >
          <FormLabel> <span className="form-text"> Name</span></FormLabel>
          <FormControl
            autoFocus
            type="name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </FormGroup>
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
        <Button block  type="submit" className="submit-button" >
          Sign in
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

        `}</style>
    </div>
  );
}
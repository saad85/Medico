import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
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

        `}</style>
    </div>
  );
}
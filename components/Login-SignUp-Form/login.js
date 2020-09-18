import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import Router from 'next/router';
import cookie from 'js-cookie';
import $ from 'jquery';

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log("email ",email);
  console.log("password ",password);

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function addOrLoginUser(event) {

    console.log("email , password",email , password)
    if(email && password) createRequest(email,password);
  }

  function setModalType(props,props2) {

    if(props && props.onChangeModalType) props.onChangeModalType();
  }
  function createRequest(email,password){

    console.log("email,password ",email,password);
    
    fetch('api/users/auth',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:  JSON.stringify({
        email,
        password,
    })}) .then((r) => {
      return r.json();
    })
    .then((data) => {

      console.log("data ",data);
      if (data && data.error) {
        console.log(data.message);
      }
      if (data && data.token) {
        //set cookie
        cookie.set('token', data.token, {expires: 2});
        Router.push('/');
      }
      console.log("props ",props);
      if(props && props.closeModal) props.closeModal();
    });;
  }

  return (
    <div className="Login">
      <form >
        <FormGroup controlId="email" >
          <FormLabel> <span className="form-text"> Email</span></FormLabel>
          <FormControl autoFocus type="email" value={email} onChange={e => setEmail(e.target.value)}/>
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel><span className="form-text"> Password</span></FormLabel>
          <FormControl value={password} onChange={e => setPassword(e.target.value)} type="password"/>
        </FormGroup>

        <div className="sign-up-text">
          <span>Dont have account? </span>
          <a onClick={()=>setModalType(props)} className="s-u-text">Sign up</a>
        </div>

        <Button block onClick={()=>addOrLoginUser()} className="submit-button" >
          Login
        </Button>
      </form>

      <style jsx>{`
                  .form-text{
                    color:#127ba3!important;
                  }
                  .submit-button{
                  }
                  .sign-up-text{
                    
                    color:#797373;

                    margin-top: -5px;
                    margin-bottom: 6px;
                    font-size: 12px;
                    padding-left: 3px;
                  }
                  .s-u-text{
                    cursor:pointer;
                  }

        `}</style>
    </div>
  );
}
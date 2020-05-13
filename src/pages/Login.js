import React, { useState, useEffect } from "react";
import { Button } from 'reactstrap';
import {Link} from "react-router-dom";
import UserAPI from "../components/UserAPI"

let storageEmail, storagePassword;

export default function Login() {
  storageEmail = 'email';
  storagePassword = 'password';

  const [email, setEmail] = useState(localStorage.getItem(storageEmail) || ''); 
  const [password, setPassword] = useState(localStorage.getItem(storagePassword) || '');

  useEffect(() => {localStorage.setItem(storageEmail, email)})  // Use useEffect to store email value in localStorage
  const updateEmail = props => {setEmail(props.target.value)} // update the email with the event (props) argument 

  useEffect(() => {localStorage.setItem(storagePassword, password)})  // Use useEffect to store email value in localStorage
  const updatePassword = props => {setPassword(props.target.value)} // update the email with the event (props) argument 

  if(localStorage.getItem("authenticated") === 'false') {
    return (
      <div>
        <div className="row text-center">
          <div className="col-sm-2"></div>
          <div className="col-sm-8">
          <h1 className="form-head">LOGIN</h1>
            <div className="form-link"><Link className="form-link" to={'/register'}>Not registered? Become a user today!</Link></div>
            <div class="form-group row">
              <label class="col-sm-4 col-form-label"><div className="form-label">Enter your email:</div></label>
              <div class="col-sm-8">
                <input type="email" class="form-control" onChange={updateEmail} value={email} id="email" placeholder="Enter Email"/>
              </div>
              </div>
              <div class="form-group row">
              <label class="col-sm-4 col-form-label"><div className="form-label">Enter your password:</div></label>
              <div class="col-sm-8">
                <input type="password" value={password} onChange={updatePassword} id="password" placeholder="Enter Password" class="form-control" />
              </div>
            </div>
            <div class="form-group row">
              <div class="col-sm-12">
                <Button onClick={() => {UserAPI('login')}} color="info">Login User</Button><br/> 
              </div>
            </div>
          </div>
        </div> 
      </div>
    )
  } else {
    // Authenticated & Doesn't need to login 
    return (
      <div></div>
    )
  }
}

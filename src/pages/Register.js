import React, { useState, useEffect } from "react";
import { Button } from 'reactstrap';
import FetchAPI from "../components/API"

let storageEmail, storagePassword;

export default function Register() {
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
      <div className="page">
      <h1>Register</h1>
      <form>
        <label htmlFor="email">Use your email to Register</label><br/>
        <input onChange={updateEmail} value={email} id="email" /><br/>
  
        <label htmlFor="password">Enter Password: </label><br/>
        <input type="password" value={password} onChange={updatePassword} id="password" /><br/>
  
        <Button onClick={() => {FetchAPI('register')}} color="success">Register Use</Button><br/> 
  
      </form>
       
    </div>
    )
    
  } else { 
    return (
      <div></div>
    )
  }
}

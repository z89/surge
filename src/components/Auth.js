import React, { useState, useEffect } from "react";
import { Button } from 'reactstrap';
import UserAPI from "./UserAPI";
//import { useLocation } from 'react-router-dom'


let result, storageEmail, storagePassword, resultBinary;


export default function Auth() {


  const [email, setEmail] = useState(localStorage.getItem(storageEmail) || ''); 
  const [password, setPassword] = useState(localStorage.getItem(storagePassword) || '');

  storageEmail = 'email';
  storagePassword = 'password';
 
  useEffect(() => {localStorage.setItem(storageEmail, email)})  // Use useEffect to store email value in localStorage
  const updateEmail = props => {setEmail(props.target.value)} // update the email with the event (props) argument 

  useEffect(() => {localStorage.setItem(storagePassword, password)})  // Use useEffect to store email value in localStorage
  const updatePassword = props => {setPassword(props.target.value)} // update the email with the event (props) argument 
  
  // Clear the localStorage for register details
  function clearStorage() {
    localStorage.removeItem(storageEmail);
    localStorage.removeItem(storagePassword);
    setEmail('');
    setPassword('');
  }
  
  return (
    <div>
      <h1>{result}</h1>
      <p><a href="/register">{resultBinary ? 'Not a member? Register now!' : null}</a></p>
      <form>
        <label htmlFor="email">{resultBinary ? 'Use your email to login: ' : 'Use your email to register: '}</label><br/>
        <input onChange={updateEmail} value={email} id="email" /><br/>

        <label htmlFor="password">Enter Password: </label><br/>
        <input type="password" value={password} onChange={updatePassword} id="password" /><br/>

        <Button onClick={() => {UserAPI(result)}} color="success">{result} user</Button><br/> 
        <Button onClick={clearStorage}  color="danger">Clear storage from register details</Button>
      </form>
       
    </div>
  )

  
}
  
  
import React, { useState, useEffect } from "react";
import { Button } from 'reactstrap';
import UserAPI from "./UserAPI";
import { useLocation } from 'react-router-dom'

let result, storageEmail, storagePassword, capitalizedResult;
function GetResults() {
  result = (useLocation().pathname).substr(1);
  result.charAt(0).toUpperCase() + result.slice(1);
  storageEmail = result + 'Email';
  storagePassword = result + 'Password';
}

export default function Auth() {
 
  const [email, setEmail] = useState(localStorage.getItem(storageEmail) || ''); 
  const [password, setPassword] = useState(localStorage.getItem(storagePassword) || '');

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
  
  return(
    <div>
      <h1>{capitalizedResult}</h1>
      <form>
        <label htmlFor="email">Email: </label>
        <input onChange={updateEmail} value={email} id="email" />

        <label htmlFor="password">Password: </label>
        <input type="password" value={password} onChange={updatePassword} id="password" />

        <Button onClick={() => {UserAPI(result)}} color="success">{capitalizedResult} user</Button>  
        <Button onClick={clearStorage}  color="danger">Clear storage from register details</Button>
      </form>
       
    </div>
  )
}
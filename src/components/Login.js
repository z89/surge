import React, { useState, useEffect } from "react";
import FetchUserData from './FetchUserData'
import { Button } from 'reactstrap';

export default function Login() {

  const [email, setEmail] = useState(localStorage.getItem('loginEmail') || ''); 
  const [password, setPassword] = useState(localStorage.getItem('loginPassword') || '');

  useEffect(() => {localStorage.setItem('loginEmail', email)})  // Use useEffect to store email value in localStorage
  const updateEmail = props => {setEmail(props.target.value)} // update the email with the event (props) argument 

  useEffect(() => {localStorage.setItem('loginPassword', password)})  // Use useEffect to store email value in localStorage
  const updatePassword = props => {setPassword(props.target.value)} // update the email with the event (props) argument 

  return(
    <div>
      <h1>Register</h1>
      <form>
        <label htmlFor="email">Email: </label>
        <input onChange={updateEmail} value={email} id="email" />

        <label htmlFor="password">Password: </label>
        <input type="password" value={password} onChange={updatePassword} id="password" />

        <Button onClick={FetchUserData} color="success">login user</Button>  
      </form>
      
    </div>
  )
}
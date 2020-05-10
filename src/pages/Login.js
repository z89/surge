import React, { useState, useEffect } from "react";
import { Button } from 'reactstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import FetchAPI from '../components/Auth';

let storageEmail, storagePassword;

function Login() {
  storageEmail = 'email';
  storagePassword = 'password';

  const [email, setEmail] = useState(localStorage.getItem(storageEmail) || ''); 
  const [password, setPassword] = useState(localStorage.getItem(storagePassword) || '');

  useEffect(() => {localStorage.setItem(storageEmail, email)})  // Use useEffect to store email value in localStorage
  const updateEmail = props => {setEmail(props.target.value)} // update the email with the event (props) argument 

  useEffect(() => {localStorage.setItem(storagePassword, password)})  // Use useEffect to store email value in localStorage
  const updatePassword = props => {setPassword(props.target.value)} // update the email with the event (props) argument 
 
  return (
    <div>
    <h1>Login</h1>
    <Link to={'/register'}>Not registered? Become a user today!</Link>
    <form>
      <label htmlFor="email">Use your email to login</label><br/>
      <input onChange={updateEmail} value={email} id="email" /><br/>

      <label htmlFor="password">Enter Password: </label><br/>
      <input type="password" value={password} onChange={updatePassword} id="password" /><br/>

      <Button onClick={() => {FetchAPI('login')}} color="success">user</Button><br/> 

    </form>
     
  </div>
  )
}
export default Login;
import React, { useState, useEffect } from "react";
import { Button } from 'reactstrap';
import jwt from 'jsonwebtoken';

const API_URL = 'http://131.181.190.87:3000'

let result, code, storageEmail, storagePassword, resultBinary;

function UserAPI(props) {
  
  const url = `${API_URL}/user/` + props;

     fetch(url,{
                method: "POST",
                headers: {aceept: "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({ email: localStorage.getItem('email'), password: localStorage.getItem('password') })
              })

        
            
    .then((res) => res.json())
    .then((res) => {
      
      if(res.status === 201) {
        // User created meaning register
        console.log(res.token);
      } else if (res.status === 200) {
        res.json()
        localStorage.setItem("token", res.token);
        console.log(res.token);
      } else if (!(res.ok)) {

        switch(res.status) {
          case 200: {
            code = 200;
            break;
          }      
          case 201: {
            code = 201;
            return code;
          }
          case 400: {
            code = 400;
            break;
          }      
          case 401: {
            code = 401;
            break;
          }
          case 403: {
            code = 403;
            break;
          }      
          case 409: {
            code = 409;
            break;
          }
          default: {}
        }
      
    }})
    .catch((err) => {
      console.log(err);
    });
}

export default function Auth() {
  
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [email, setEmail] = useState(localStorage.getItem(storageEmail) || ''); 
  const [password, setPassword] = useState(localStorage.getItem(storagePassword) || '');

  // Call once the current URL and assign to currentPath 
  useEffect(() => {
    const { pathname } = window.location;
    console.log("New path:", pathname);
    setCurrentPath(pathname);
  }, []);

  
  // Detect current URL 
  let url = currentPath.substr(1);
  resultBinary = 0;
  if(url === 'login') {
    resultBinary = 1;
  } else if (url === 'register') {
    resultBinary = 0;
  }

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

        <Button onClick={() => {UserAPI(url)}} color="success">{result} user</Button><br/> 
       
        <Button onClick={clearStorage}  color="danger">Clear storage from register details</Button>
      </form>
       
    </div>
  )

  
}
  
  
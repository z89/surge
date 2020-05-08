import React, { useState, useEffect } from "react";
//import jwt from "jsonwebtoken";
import { Button } from 'reactstrap';

let pick = 'login';
function RegisterData() {
  const url = "http://131.181.190.87:3000/user/" + pick

  return fetch(url, {
    method: "POST",
    headers: {aceept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ email: localStorage.getItem('registerEmail'), password: localStorage.getItem('registerPassword') })
  })
  .then((res) => res.json())
  .then((res) => {
    console.table((res));
    //localStorage.setItem("token", res.token); 
  })
}
/*
const processData = props => {
  console.log(localStorage.getItem('registerEmail'));
  console.log(localStorage.getItem('registerPassword'));

  return(
    <div>
<p>You success created a new user</p>
  
    </div>
  )
}*/
export default function Register() {

  const [email, setEmail] = useState(localStorage.getItem('registerEmail') || ''); 
  const [password, setPassword] = useState(localStorage.getItem('registerPassword') || '');

  useEffect(() => {localStorage.setItem('registerEmail', email)})  // Use useEffect to store email value in localStorage
  const updateEmail = props => {setEmail(props.target.value)} // update the email with the event (props) argument 

  useEffect(() => {localStorage.setItem('registerPassword', password)})  // Use useEffect to store email value in localStorage
  const updatePassword = props => {setPassword(props.target.value)} // update the email with the event (props) argument 

  return(
    <div>
      <h1>Register</h1>
      <form>
        <label htmlFor="email">Email: </label>
        <input onChange={updateEmail} value={email} id="email" />

        <label htmlFor="password">Password: </label>
        <input type="password" value={password} onChange={updatePassword} id="password" />

        <Button onClick={RegisterData} color="success">register user</Button>  
      </form>
      
    </div>
  )


        /*const [email, setEmail] = useState(localStorage.getItem('registerEmail') || ''); 
  const [password, setPassword] = useState(localStorage.getItem('registerPassword') || '');

  useEffect(() => {localStorage.setItem('registerEmail', email)})  // Use useEffect to store email value in localStorage
  const updateEmail = props => {setEmail(props.target.value)} // update the email with the event (props) argument 

  useEffect(() => {localStorage.setItem('registerPassword', password)})  // Use useEffect to store email value in localStorage
  const updatePassword = props => {setPassword(props.target.value)} // update the email with the event (props) argument 

  // Clear the localStorage for register details
  function clearStorage() {
    localStorage.removeItem('registerEmail');
    localStorage.removeItem('registerPassword');
    
    setEmail('');
    setPassword('');
  
  }

  // Result JSX results
  return (
    <div>
      <h1>Register</h1>
      <form>
        <label htmlFor="email">Email: </label>
        <input placeholder={email} onChange={updateEmail} id="email" />

        <label htmlFor="password">Password: </label>
        <input placeholder={password} onChange={updatePassword} id="password" />
      </form>
      <hr/>
      <h3>Details:</h3>
      <p>email: {email}</p>
      <p>password: {password}</p>
  



      <Button onClick={Data} color="success">register datat</Button>
      <Button onClick={clearStorage}  color="danger">Clear storage from register details</Button>
    
    </div>
  );*/


}
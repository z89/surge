//const API_URL = 'http://131.181.190.87:3000'
export default function FetchUserData(props) {
  //const url = `${API_URL}/user/` + props.request;
  //const url = `${API_URL}/user/login`;

  if (props.request === 'login') {
      console.log("login requested");
  } else if (props.request === 'request') {
    console.log("register requested");
  }

  /*
  return fetch(url, {
    method: "POST",
    headers: {aceept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ email: localStorage.getItem('registerEmail'), password: localStorage.getItem('registerPassword') })
  })
  .then((res) => res.json())
  .then((res) => {
    console.table((res));
    //localStorage.setItem("token", res.token); 
  })*/
}

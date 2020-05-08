const API_URL = 'http://131.181.190.87:3000'
const UserAPI = props => {
  const url = `${API_URL}/user/` + props;

  if(props === 'login') {
    return fetch(url, {
      method: "POST",
      headers: {aceept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ email: localStorage.getItem('lemail'), password: localStorage.getItem('lpassword') })
    })
    .then((res) => res.json())
    .then((res) => {
      console.table((res));
      //localStorage.setItem("token", res.token); 
    })
  } else if (props === 'register') {
    return fetch(url, {
      method: "POST",
      headers: {aceept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ email: localStorage.getItem('remail'), password: localStorage.getItem('rpassword') })
    })
    .then((res) => res.json())
    .then((res) => {
      console.table((res));
      //localStorage.setItem("token", res.token); 
    })
  } else {
    console.log("ero");
  }

}

export default UserAPI;

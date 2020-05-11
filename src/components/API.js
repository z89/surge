const API_URL = 'http://131.181.190.87:3000'

export default function FetchAPI(props) {
  localStorage.setItem("authenticated", false);
  localStorage.setItem("status", 200);
  let status = 0;
  let apiURL = `${API_URL}`;
  let method, headers, body; 
 
  switch(props) {
    case 'login': {
      apiURL += `/user/login`;

      method = "POST";
      headers =  {aceept: "application/json", "Content-Type": "application/json" };
      body = JSON.stringify({email: localStorage.getItem('email'), password: localStorage.getItem('password')});
      
      break;
    }
    case 'register': {
      apiURL += `/user/register`;
     
      method = "POST";
      headers =  {aceept: "application/json", "Content-Type": "application/json" };
      body = JSON.stringify({email: localStorage.getItem('email'), password: localStorage.getItem('password')});
      break;
    }
    case 'authenticate': {
      if(localStorage.getItem("authenticated") === 'true') {
        apiURL += `/stocks/authed/AAL`;

        method = "GET";
        headers =  {aceept: "application/json", "Content-Type": "application/json", Authorization: `Bearer`};
      }
      break;
    }
    default: {
      return;
    }
  }
  
  return fetch(apiURL, {method, headers, body})
  .then((res) => {
    status = res.status;
    localStorage.setItem("status", status);
    
    return res.json()
  })
  .then((res) => {
    
      switch(Number(localStorage.getItem("status"))) {
        case 200: {
       
          localStorage.setItem("authenticated", true );
          localStorage.setItem("token", res.token);
          console.log("logged in");
          window.location.href = "/stocks";
          break;
        }      
        case 201: {
      
          localStorage.setItem("authenticated", false);
          
          localStorage.removeItem("token")
          console.log("registered user");
          window.location.href = "/login";
          break;
        }
        case 400: {
          console.log("Bad Request");
          break;
        }      
        case 401: {
          console.log("Unauthorised");
          break;
        }
        case 403: {
          console.log("Forbidden API Fetch");
          break;
        }      
        case 404: {
          console.log("404 Not Found");
          break;
        }
        case 409: {
          console.log("User Exists");
          break;
        }
        default: {
          break;
        }
      }
  })
        
}

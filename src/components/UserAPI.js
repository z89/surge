const API_URL = 'http://131.181.190.87:3000'
const UserAPI = props => {
  const url = `${API_URL}/user/` + props;

    fetch(url,{
                method: "POST",
                headers: {aceept: "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({ email: localStorage.getItem('email'), password: localStorage.getItem('password') })
              })
    .then((res) => { 
      switch(res.status) {
        case 401:
          console.log("401 detected"); 
          break;
        case 200: 
        console.log("awesome");
        
      }

      return res.json() 
    })
    .then((jsonData) => {
      console.table(jsonData);
    })
    .catch((err) => {
      // handle error for example
      // console.error(err);
      console.log("asdasdaswtf");
      
    });
    


}

export default UserAPI;

var bcrypt = require('bcrypt'); // Hasing passwords
var jwt = require('jsonwebtoken'); // JWT tokens for authentication
var express = require('express'); 
var router = express.Router();

// Global variables
const secretKey = "this is a passphrase"; // Used for salting hash ** KEEP SECRET **

// Register request via /user/register
router.post('/register', function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  // If email or password are empty
  if(!email || !password) {
    res.status(400).json({
    error: true,
    message: "Request body incomplete - email and password needed"
    });
    return
  }

  // Else query the database for users that match the email
  const queryUsers = req.db.from("users").select("*").where("email", "=", email);
 
  queryUsers.then((users) => {
    // User already exists if there are more than 0 rows in query
    if(users.length > 0) {
      res.status(409).json({error: true, message: "User already exists!"});
      return
    }

    // If user doesn't exist, use bcrypt to salt & hash password for database
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);
    return req.db.from("users").insert({email, hash})
  })
  .then(() => {
    res.status(201).json({success: true, message: "User created"});
  })
})

// Login request via /user/login
router.post('/login', function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  // If email or password are empty
  if(!email || !password) {
    res.status(400).json({
      error: true,
      message: "Request body incomplete - email and password needed"
    });
    return
  }

  // Else query the database for users that match the email
  const queryUsers = req.db.from("users").select("*").where("email", "=", email);
 
  queryUsers.then((users) => {
    // If query returns nothing, user does not exist
    if(users.length == 0) {
      res.status(401).json({error: true, message: "Incorrect email or password"})
      return
    }

    // Else get the supplied password and compare to the hashed user password in database
    const user = users[0];
    return bcrypt.compare(password, user.hash)
  })
  .then((match) => {
    // If the comparasion failed, incorrect password supplied
    if(!match) {
      res.status(401).json({error: true, message: "Incorrect email or password"});
      return
    }

    // Else return bearer token and expiring time as json response
    const expires_in = 60 * 60 * 24; // 1 day
    const exp = Date.now() + expires_in * 1000;
    const token = jwt.sign({ email, exp }, secretKey);
    res.json({ token, token_type: "Bearer", expires_in });
    
  });
});

module.exports = router;

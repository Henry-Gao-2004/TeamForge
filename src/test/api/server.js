const express = require('express');

/* This is the 1st, hard coded method we CAN use, but shouldn't for security
const AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-2'
    accessKeyID: public key
    secretAccessKey: should not be hardcoded 
}); */

const { S3 } = require("@aws-sdk/client-s3");
const gremlin = require('gremlin');
const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;
const port = process.env.PORT || 8182;


// Set up AWS credentials (2nd method), we can use this method for better security:
//The AWS SDK will assign the EC2's temporary credentials from the assigned IAM role it has
const s3 = new S3({
    region: 'us-east-2',
});

s3.listBuckets(function(err, data) {
    if (err) {
      console.log(err, err.stack);
    } else {
      console.log(data);
    }
});

// Create drivers for reading and writing to database; each have their own endpoint and need their own driver/connection
const readRemoteConnection = new gremlin.driver.DriverRemoteConnection({
    remote: {
        gremlin: 'wss://teamforgedb.cluster-ro-croj01onqdg2.us-east-2.neptune.amazonaws.com:8182/gremlin',
    },
    mimeType: 'application/vnd.gremlin-v2.0+json',
});

const writeRemoteConnection = new gremlin.driver.DriverRemoteConnection({
    remote: {
        gremlin: 'wss://teamforgedb.cluster-croj01onqdg2.us-east-2.neptune.amazonaws.com',
    },
    mimeType: 'application/vnd.gremlin-v2.0+json'
});

/*We can now query with either driver using Gremlin

const graph = new Graph().traversal().withRemote(readRemoteConnection);

*/



const app = express();
//To parse JSON requests
app.use(express.json());



//POST route to create a profile -- for the register page
app.post('/api/createprofile', (req, res) => {
  Username = 'TeamForge';
  // Use some method to hash the password here
  HashedPassword = 'servertest101';

  addProfile(Username, HashedPassword);
  

  res.status(201).json({message: 'Profile created successfully!'});
});

//GET route to sign in -- for the login page 
app.get('/api/signin', (req, res) => {
  Username = req.body.username;
  //Hash the password here
  HashedPassword = req.body.password;

  // check the relational database to see if a user w/ the username exists and if it does, check that user's hashed pwd in the data
  // --base with the hashed password sent in the request

  if (Authenticate(Username, HashedPassword)){
        // return the appropriate profile info
  } else {
      // return an error message stating the password was incorrect/did not match
  }

});


//query for creating profiles; still needs to check if the Username already exists
function addProfile(Username, HashedPassword){
  // use the write endpoint connection
  graph1 = new Graph().traversal().withRemote(writeRemoteConnection); 
  // each node is a "user" node with the label as the username and properties that store the hashed password
  graph1.addV(`${Username}`).property('Hashed_Password', HashedPassword).next()
    .then(result => console.log(result))
    .catch(error => console.log(error));

}

//query for authenticating a user in the database -- for the login page
function Authenticate(Username, HashedPassword){
  
}

// Server is running
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
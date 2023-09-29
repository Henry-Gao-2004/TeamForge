const express = require('express');
const AWS = require('aws-sdk');
const gremlin = require('gremlin');
const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;
const port = process.env.PORT || 3000;


// Set up AWS credentials (2 methods):

/*
This is the hard coded method we CAN use, but shouldn't for security

AWS.config.update({
    region: 'us-east-2',
    accessKeyID: , // from the IAM role/user
    secretAccessKey: , // from the IAM role/user
}); 

*/

// We can use this method for better security
//The AWS SDK will assign the EC2's temporary credentials from the assigned IAM role it has
const s3 = new AWS.S3();

s3.listBuckets(function(err, data) {
    if (err) {
      console.log(err, err.stack);
    } else {
      console.log(data);
    }
  });

// Create drivers for reading and writing to database; each have their own endpoint and need their own driver/connection
const readRemoteConnection = gremlin.driver.DriverRemoteConnection({
    remote: {
        gremlin: 'wss://teamforgedb.cluster-ro-croj01onqdg2.us-east-2.neptune.amazonaws.com:8182/gremlin',
    },
    mimeType: 'application/vnd.gremlin-v2.0+json',
});

const writeRemoteConnection = gremlin.driver.DriverRemoteConnection({
    remote: {
        gremlin: 'wss://teamforgedb.cluster-croj01onqdg2.us-east-2.neptune.amazonaws.com',
    },
    mimeType: 'application/vnd.gremlin-v2.0+json'
});

//We can now query with either driver using Gremlin

const graph = new Graph().traversal().withRemote(readRemoteConnection);
const graph1 = new Graph().traversal().withRemote(writeRemoteConnection); 


const app = express();
//To parse JSON requests
app.use(express.json());



//POST route to create a profile
app.post('/api/createprofile', (req, res) => {
   Username = req.body.username;
  // Use some method to hash the password here
   HashedPassword = req.body.password;

  addProfile(Username, Password);
  

  res.status(201).json({message: 'Profile created successfully!'});
});

//GET route to sign in
app.get('/api/signin', (req, res) => {
     Username = req.body.username;
    //Hash the password here
     HashedPassword = req.body.password;

    // check the relational database to see if a user w/ the username exists and if it does, check that user's hashed pwd in the data
    // --base with the hashed password sent in the request
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

//query for authenticating a user in the database
function Authenticate(Username, HashedPassword){
  
}

// Server is running
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
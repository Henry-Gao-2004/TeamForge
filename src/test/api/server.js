const express = require('express');

/* This is the 1st, hard coded method we CAN use, but shouldn't for security
const AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-2'
    accessKeyID: public key
    secretAccessKey: should not be hardcoded 

    we can use aws configure to test, we can add the access keys to that in the terminal without writing in the code
}); */

const bcrypt = require('bcrypt');
const { S3 } = require("@aws-sdk/client-s3");
const gremlin = require('gremlin');
const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;
const port = process.env.PORT || 8182;


// Set up AWS credentials (2nd method), we can use this method for better security:
//The AWS SDK will assign the EC2's temporary credentials from the assigned IAM role it has

const s3 = new S3({
    //region: 'us-east-2',
});

s3.listBuckets(function(err, data) {
    if (err) {
      console.log(err, err.stack);
    } else {
      console.log(data);
    }
});

const readRemoteConnection = new gremlin.driver.DriverRemoteConnection(
  'wss://teamforgedb.cluster-ro-croj01onqdg2.us-east-2.neptune.amazonaws.com:8182/gremlin',
  { mimeType: 'application/vnd.gremlin-v2.0+json' }
);

const writeRemoteConnection = new gremlin.driver.DriverRemoteConnection(
  'wss://teamforgedb.cluster-croj01onqdg2.us-east-2.neptune.amazonaws.com:8182/gremlin',
  { mimeType: 'application/vnd.gremlin-v2.0+json' }
);

/*We can now query with either driver using Gremlin

const graph = new Graph().traversal().withRemote(readRemoteConnection);

*/



const app = express();
//To parse JSON requests
app.use(express.json());



//POST route to create a profile -- for the register page
app.post('/api/createprofile', async (req, res) => {
  const Username = 'TeamForge';
  // Use some method to hash the password here, used bcrypt
   const HashedPassword =  bcrypt.hashSync('servertest101', 10);

   try {
    await addProfile(Username, HashedPassword);
    res.status(201).json({ message: 'Profile created successfully!' });
} catch (error) {
    console.error('Error creating profile:', error);
    res.status(500).json({ message: 'Error creating profile. Please try again later.' });
}
});



//POST route to sign in -- for the login page 
app.post('/api/signin', async (req, res) => {
  console.log("Signin route hit!");
  const Username = req.body.username;
  const plainTextPassword = req.body.password;
  console.log("Entered plain-text password for login:", plainTextPassword);

  try {
      const storedHashedPassword = await getStoredHashedPassword(Username);
      console.log("Stored hashed password for login:", storedHashedPassword);
      if (storedHashedPassword && bcrypt.compareSync(plainTextPassword, storedHashedPassword)) {
          res.status(200).json({ message: 'Successfully authenticated!' });
      } else {
          res.status(401).json({ message: 'Authentication failed. Check username and password.' });
      }
  } catch (error) {
      console.error('Error during authentication:', error);
      res.status(500).json({ message: 'Error during authentication. Please try again later.' });
  }
});


//query for creating profiles; still needs to check if the Username already exists
async function addProfile(Username, HashedPassword){
  // use the write endpoint connection
 const graph1 = new Graph().traversal().withRemote(writeRemoteConnection); 
  // each node is a "user" node with the label as the username and properties that store the hashed password
  await graph1.addV(`${Username}`).property('Hashed_Password', HashedPassword).next()
    

}

//query for authenticating a user in the database -- for the login page
async function getStoredHashedPassword(Username) {
  const graph = new Graph().traversal().withRemote(readRemoteConnection);
  let userVertex;
  try {
      userVertex = await graph.V().hasLabel(Username).next();
  } catch (error) {
      console.error('Error querying the database:', error);
      throw error;
  }

  if (userVertex && userVertex.value) {
      return userVertex.value('Hashed_Password');
  }
  return null;
}

/* app.use((req, res, next) => {
  res.status(404).send('Route not found');
});
*/
// Server is running
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
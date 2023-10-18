const express = require('express');
const bcrypt = require('bcrypt');
const port = process.env.PORT || 3001;
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:3001'
}));

app.use(express.json());

let users = [];  // Mock database for user profiles

app.post('/api/createprofile', async (req, res) => {
    const Username = req.body.username;
    const plainTextPassword = req.body.password;

    // Check if username already exists
    const existingUser = users.find(user => user.username === Username);
    if (existingUser) {
        return res.status(409).json({ message: 'Username already exists. Please choose another.' });
    }

    const HashedPassword = bcrypt.hashSync(plainTextPassword, 10);
    try {
        await addProfile(Username, HashedPassword);
        res.status(201).json({ message: 'Profile created successfully!' });
    } catch (error) {
        console.error('Error creating profile:', error);
        res.status(500).json({ message: 'Error creating profile. Please try again later.' });
    }
});

app.post('/api/signin', async (req, res) => {
    const Username = req.body.username;
    const plainTextPassword = req.body.password;

    try {
        const storedHashedPassword = await getStoredHashedPassword(Username);
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

// Mock function to simulate adding a profile to our "database"
async function addProfile(Username, HashedPassword) {
    users.push({
        username: Username,
        password: HashedPassword
    });
    console.log("Profile added with username:", Username, "and hashed password:", HashedPassword);
}

// Mock function to simulate fetching a stored password from our "database"
async function getStoredHashedPassword(Username) {
    const user = users.find(u => u.username === Username);
    return user ? user.password : null;
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

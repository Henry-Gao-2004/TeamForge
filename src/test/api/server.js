const express = require('express');
const bcrypt = require('bcrypt');
const port = process.env.PORT || 3001;

const app = express();

app.use(express.json());

app.post('/api/createprofile', async (req, res) => {
    const Username = 'TeamForge';
    const HashedPassword = bcrypt.hashSync('servertest101', 10);

    try {
        await addProfile(Username, HashedPassword);
        res.status(201).json({ message: 'Profile created successfully!' });
    } catch (error) {
        console.error('Error creating profile:', error);
        res.status(500).json({ message: 'Error creating profile. Please try again later.' });
    }
});

app.post('/api/signin', async (req, res) => {
    console.log("Signin route hit!");
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

// Mock function to simulate adding a profile
async function addProfile(Username, HashedPassword) {
    console.log("Profile added with username:", Username, "and hashed password:", HashedPassword);
}

// Mock function to simulate fetching a stored password
async function getStoredHashedPassword(Username) {
    if (Username === 'TeamForge') {
        return bcrypt.hashSync('servertest101', 10); // return the hardcoded hashed password
    }
    return null;
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

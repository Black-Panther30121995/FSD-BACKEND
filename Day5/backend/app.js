const express = require('express');
const cors = require('cors');
const fs = require('fs/promises');

const app = express();
let users = [];

app.use(express.json());
app.use(cors());


const readdata = async () => {
    try {
        const data = await fs.readFile('./data.json', 'utf8');
        users = JSON.parse(data);
        if (!Array.isArray(users)) throw new Error('Data is not an array');
        users.forEach((user, i) => {
            if (typeof user.id !== 'number' || isNaN(user.id)) {
                user.id = i + 1; 
            }
        });
    } catch (err) {
        console.error('Error reading data.json:', err.message);
        users = []; 
    }
};

const writedata = async () => {
    try {
        await fs.writeFile('./data.json', JSON.stringify(users, null, 2)); 
    } catch (err) {
        console.error('Error writing to data.json:', err.message);
    }
};


app.get('/users', async (req, res) => {
    res.json(users);
});

app.post('/users', async (req, res) => {
    const { name, age } = req.body;
    if (!name || !age) {
        return res.status(400).json({ message: 'Name and age are required' });
    }
    const lastId = users.length > 0 ? Number(users[users.length - 1].id) : 0;
    const newid = isNaN(lastId) ? 1 : lastId + 1;
    const newuser = { id: newid, name, age };
    users.push(newuser);
    await writedata(); 
    res.status(200).json({ message: 'User registered successfully', data: newuser });
});


app.put('/users/:id', async (req, res) => {
    const uid = Number(req.params.id); 
    const { name, age } = req.body;
    const userIndex = users.findIndex(user => user.id === uid); 

    if (isNaN(uid)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }
    if (!name || !age) {
        return res.status(400).json({ message: 'Name and age are required' });
    }
    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    users[userIndex].name = name;
    users[userIndex].age = age;
    await writedata();
    res.status(200).json({ message: 'User updated successfully', data: users[userIndex] });
});


app.delete('/users/:id', async (req, res) => {
    const uid = Number(req.params.id); 
    const userIndex = users.findIndex(user => user.id === uid); 

    if (isNaN(uid)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }
    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    const deletedUser = users[userIndex]; 
    users.splice(userIndex, 1);
    await writedata();
    res.status(200).json({ message: 'User deleted successfully', data: deletedUser });
});


(async () => {
    await readdata(); 
    app.listen(9000, () => {
        console.log('Server is running on port 9000');
    });
})();
const express = require("express");
const cors = require('cors');

const Sequelize = require('sequelize');
const { user } = require('./models');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(express.json()); //needed to parse req.body

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.get('/users', async (req, res) => {
    const users = await user.findAll();
    res.json(users);
});

app.post('/users', async (req, res) => {
    // req.body contains an Object with firstName, lastName, email
    const { username, password, firstName, lastName, address } = req.body;

    const previousUser = await user.findOne({ where: { username } }); // checks to see if user exists

    if (previousUser) return res.status(400).send('User is already registered.');

    const newUser = await user.create({
        username,
        password,
        firstName,
        lastName,
        address,
        isAdmin: false
    }).catch(function () {
        console.log("Promise Rejected");
    });
    res.json({
        message: `User with username ${username} was successfully created`
    });
});



app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
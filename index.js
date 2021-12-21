const express = require("express");
const cors = require('cors'); //not sure why I need this
const jwt = require("jsonwebtoken");
const config = require("./config/auth.config");
const auth = require("./middleware/auth");

const Sequelize = require('sequelize');
const { user } = require('./models');

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors()); //not sure why I need this
app.use(express.json()); //needed to parse req.body

const bcrypt = require('bcrypt');


app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.get('/users/me', auth, async (req, res) => {
    const foundUser = await user.findByPk(req.body.user.id, { attributes: { exclude: ["password", "createdAt", "updatedAt"] } }); //might need to change in the future
    res.json(foundUser);
});

app.get('/users', async (req, res) => {
    const users = await user.findAll();
    res.json(users);
});


//register user
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

    //add bcrypt
    const salt = await bcrypt.genSalt(10);
    bcrypt.hash(newUser.password, salt, async function (err, hash) {
        newUser.password = hash;
        await newUser.save(); //saves the hashed password in database
    });

    const token = jwt.sign({
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        address: newUser.address,
        isAdmin: newUser.isAdmin,
    },
        config.secret
    );

    res
        .header("x-auth-token", token)
        .header('access-control-expose-headers', 'x-auth-token')
        .status(200)
        .send({ message: `User with username ${username} was successfully created` });
});

//login user

app.post('/auth', async (req, res) => {
    // find username in database and store it in a constant
    //if the const exists then proceed to check password
    //compare the passwords because the one stored in the database is hashed
    const { username, password } = req.body;

    const existingUser = await user.findOne({ where: { username } });
    if (!existingUser) return res.status(404).send('Login failed, username does not exist.');

    const match = await bcrypt.compare(password, existingUser.password);
    if (!match) return res.status(401).send('Login failed, password is incorrect');

    const token = jwt.sign({
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        address: newUser.address,
        isAdmin: newUser.isAdmin,
    },
        config.secret
    );

    res.status(200).send(token);
});




app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
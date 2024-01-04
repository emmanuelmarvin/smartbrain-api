const bodyParser = require("body-parser")
const express = require("express")
const cors = require('cors')
const app = express()
const knex = require('knex')
const bcrypt = require('bcrypt-node')
const register = require("./controller/register")
const signin = require("./controller/signin")
const fetchProfile = require("./controller/fetchProfile")
const update = require("./controller/update")
const clarifai = require('./controller/clarifai')
const database = knex({
    client: 'pg',
    connection: {
        host: process.env.DB_URL,
        user: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: process.env.DB_NAME,
        ssl: true
    },
});



app.use(bodyParser.json())
app.use(cors())


app.get("/", (req, res) => {
    console.log("Root")
    res.send("UP AND RUNNING")
})

app.post('/signin', (req, res) => {
    signin.handleSign(req, res, database, bcrypt)
})

app.post("/register", (req, res) => {
    register.handleRegister(req, res, database, bcrypt)
})


app.get("/profile/:id", (req, res) => {
    fetchProfile.getProfile(req, res, database)
})

app.post("/face-detection", (req, res) => {
    clarifai.detectFace(req, res)
})

app.put("/image", (req, res) => {
    update.imageUpdate(req, res, database)
})

app.listen(3001, () => {
    console.log("Up and running at port:3001")
})
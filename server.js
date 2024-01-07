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
const { createClient } = require('@supabase/supabase-js')
const database = knex({
    client: 'pg',
    version: "15",

    connection: {
        connectString: process.env.DB_CONNECT,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        port: 5432,
        password: process.env.DB_PWD,
        database: process.env.DB_NAME,
        ssl: true

    },
});


const supabase = createClient(
    process.env.SU_URL,
    process.env.SU_API,

);



app.use(bodyParser.json())
app.use(cors())


app.get("/", (req, res) => {
    console.log("Root")
    res.send("UP AND RUNNING")
})

app.post('/signin', async (req, res) => {
    await signin.handleSign(req, res, supabase, bcrypt)
})

app.post("/register", async (req, res) => {
    await register.handleRegister(req, res, supabase, bcrypt)
})


app.get("/profile/:id", (req, res) => {
    fetchProfile.getProfile(req, res, database)
})

app.post("/face-detection", (req, res) => {
    clarifai.detectFace(req, res)
})

app.put("/image", (req, res) => {
    update.imageUpdate(req, res, supabase)
})

app.listen(3001, () => {
    console.log("Up and running at port:3001")
})
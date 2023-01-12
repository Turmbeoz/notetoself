const express = require('express');
const app = express();
require("dotenv").config();
const PORT = 5000;
// const mongoClusterPW = "b1gPbjCq8cT7itBr";
const mongoClusterPW = process.env.MONGOOSE_CLUSTER_PW
const mongoose = require("mongoose");
const User = require("./UserSchema");

const uri = `mongodb+srv://adminPerson:${mongoClusterPW}@cluster0.o9r1prt.mongodb.net/?retryWrites=true&w=majority`;
const userMethods = require("./userDatabase");
// const bodyParser = require("body-parser")
// import fetch from "node-fetch";
// const ACCESS_TOKEN = "LIHMDFF4XAXPDO3J72DG46LV666I6SIL"
// const CLIENT_TOKEN = "LIHMDFF4XAXPDO3J72DG46LV666I6SIL"
// const axios = require("axios")

// const Wit = require('node-wit').Wit;
// const client = new Wit({accessToken: ACCESS_TOKEN});



console.log("Inside Express Server");
mongoose.set('strictQuery', true);
mongoose.connect(uri);


// const q = encodeURIComponent('set an alarm for 2pm');
// const uri = 'https://api.wit.ai/message?v=20221114&q=' + q;
// const auth = 'Bearer ' + CLIENT_TOKEN;
// fetch(uri, {headers: {Authorization: auth}})
//   .then(res => res.json())
//   .then(res => console.log(res));
console.log("Pizza time")
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', (req, res) => {
    console.log("Hey there from middleware")
    res.sendStatus(200);
  })





app.post('/newuser', userMethods.checkIfUserExists, userMethods.createUser, (req, res) => {

    console.log("Hey there from trial middleware")
    // res.json({"Wit API": ["Tom", "Dexter", "Batman"]})
    // res.send('Hello Earth 2!')
  })



app.post('/login', userMethods.verifyUser, (req, res) => {

    console.log("Hey there - you tryna log in ?")
    // res.json({"Wit API": ["Tom", "Dexter", "Batman"]})
    // res.send('Hello Earth 2!')
  })

app.listen(PORT, () => {
    console.log("listening on http://localhost:"+ PORT + "/")
});
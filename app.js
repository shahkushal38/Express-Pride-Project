const express = require("express");
const bodyparser = require('body-parser')
require('dotenv').config()
// const MongoClient = require('mongodb').MongoClient

const mongoose = require('mongoose')

//sql connection
const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test'
})
connection.connect()

const app = express();
const port = 3000

// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

//MongoDB Connection 
const connectionParams={
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true 
}

mongoose.connect(process.env.MONGO_URL,connectionParams)
.then(() => {
  console.log("connection established - ")
}) 
.catch((err) => {
  if (err){
    throw err;
  }})


//custom middleware
const myLogger = (req,res,next)=> {
  req.body.requestTime = Date.now();
  console.log("Logged");
  next();
}

app.use(myLogger);

app.post('/', (req, res) => {
  try{      
    if(req.body.name){
      console.log("request -- ")
      const date = req.body.requestTime

      connection.query(`insert into user_info(id,name) values (1, '${req.body.name}')`, (err) => {
        if (err) throw err
      
        console.log('insert query success')
      })
      res.status(200).send(`Hello World! Requested at - ${date}` )
    }else{
      throw "Error Found";;
    }
  }
  catch(err) {
    res.status(400).send(`Bad Request - ${err})`);
  }
})

const homeroute = require("./Routes/home");
app.use("/home",homeroute);

const customerRoute = require('./Routes/customer');
app.use("/customer",customerRoute)
 
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    console.log("Hello world");
    console.log(process.env.MONGO_URL)
  })


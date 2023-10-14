const Customer = require('../Schema/customerSchema')
const express = require('express');
const router = express.Router();

router.post('/addCustomer', (req, res) => {
    try{      
      if(req.body.name){
        console.log("request -- ")
  
        const customer = new Customer({
          name: req.body.name
        }) 
  
        customer.save()
        const date = req.body.requestTime

        connection.query(`insert into user_info(id, name) values (1,'${req.body.name})`, (err) => {
            if (err) throw err
          
            console.log('Insert query successful')
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

  module.exports = router
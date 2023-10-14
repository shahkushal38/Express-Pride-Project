const mongoose = require('mongoose')

//mongoDb schema
const customerSchema = new mongoose.Schema({
    name: String,
  }); 

module.exports =  mongoose.model("Customer", customerSchema)

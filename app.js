const exp = require("constants");
const express = require("express");
const path = require('path');
const bodyparser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// getting-started.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactiCoder', {useNewUrlParser: true, useUnifiedTopology: true});

const contactSchema = new mongoose.Schema({
  email: String,
  query: String,
  desc: String
});
const Contact = mongoose.model('Contact', contactSchema);
// EXPRESS SPECIFIC STUFF
app.use('/resources', express.static('resources')); // For serving static files

// ENDPOINTS
app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname, '/index.html'));
})
app.get('/about.html', (req, res)=>{
  res.sendFile(path.join(__dirname, '/about.html'));
})
app.get('/contact.html', (req, res)=>{
  res.sendFile(path.join(__dirname, '/contact.html'));
})
app.post('/contact.html', (req, res)=>{
  var myData = new Contact(req.body);
  myData.save().then(()=>{
    res.send("The form has been sent to DataBase.")
  })
  res.sendFile(path.join(__dirname, '/contact.html'));
  
})

// START THE SERVER
app.listen(port, ()=>{
  console.log(`The application started successfully at port: ${port}`)
})
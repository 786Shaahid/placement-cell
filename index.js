const express=require('express');
const app=express();
const bodyParser = require("body-parser");

const path=require('path');
const port=process.env.PORT || 5000;
require('dotenv').config();
// connection with mongodb
const mongoose=require('./config/mongoose');
const cookieParser = require('cookie-parser');


// middlewere
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}))
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));


app.use(cookieParser());
// set view engine
app.set('view engine','ejs');

// middlewere for static files
app.use(express.static(path.join(__dirname,'assests')))

// route middlewere

  app.use('/employees',require('./routes/employe'))
  app.use('/student-updated',require('./routes/update'))
// add home 
app.all("/*", (req, res) => {
  return res.send(
    "<h1>Page does not exist</h1><br/><h3>Links For Accessing app</h3><br/><ul><li><a href='/employees/home'>Home</a></li><li><a href='/employees/student-list'>Student List</a></li><li><a href='/employees/add-company'>Add Company</a></li></ul>"
  );
});

app.listen(port,()=>{
  console.log(`Server is running on port:${port}`);
})



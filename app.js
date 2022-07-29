const express = require("express");

const app = express();

//routes
app.get('/',(req,res,next)=> {
   res.json({
       message: "Welcome to the homepage"
   });
});

module.exports = app;

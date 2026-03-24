import express from 'express';
import { app } from './app.js';
import dotenv from 'dotenv';

const App = express(); //create express app


dotenv.config(); //load environment variables from .env file
console.log(app.text1);

App.get("/",(req,res)=>{
    console.log(req.headers);
    res.send("Hello world from express server default get method slash / route");
})

//server listen port
App.listen(process.env.PORT || 3200, ()=> {
    console.log("Server running on port" , process.env.PORT);
})

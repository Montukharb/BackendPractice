import express from 'express';
import { app } from './app.js';
import dotenv from 'dotenv';
import {Request,Response } from 'express';
import {dbConnection} from './config/dbConnection.js';
import router from './routes/basic.routes.js';
dotenv.config(); //load environment variables from .env file

//connect to database;
await dbConnection.connect();
 
//create express app
const App = express();
console.log(app.text1);

//middleware
App.use(express.json());  //middleware for json data accepting all route;
App.use(express.urlencoded({extended:true})); //middleware for urlencoded data accepting means html form data;

App.set("view engine","ejs"); //set middleware for view engine;
// Agar views folder ka name change kar diya for example htmlTemplates ya or bhi kuch to manually set karna padega view engine folder name for example
// App.set('views', '../htmlTemplates');
//......................folder name.......


//Routes middleware;
// App.use('/api/',router) //all routes start with /api/ for example http://localhost:3200/api/createUser etch

App.use(router);


// All routes above this line;
//last middleware handle all unexpected routes here
App.use((req:Request,res:Response)=>{   
    res.status(404).send("404 page not found");
})



//server listen port
const server =  App.listen(process.env.PORT || 3200, ()=> {
    console.log("Server running on port" , process.env.PORT);
});

server.on('error',(err)=>{
    console.log("Server error : " + err);
})
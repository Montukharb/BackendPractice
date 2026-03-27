import express from 'express';
import { app } from './app.js';
import dotenv from 'dotenv';
import { Request,Response } from 'express';
import { dbConnection } from './dbConnection.js';
dotenv.config(); //load environment variables from .env file

await dbConnection.connect();
 
const App = express(); //create express app

console.log(app.text1);

App.use(express.json());  //middleware for json data accepting all route;
App.use(express.urlencoded({extended:true})); //middleware for urlencoded data accepting means html form data;



App.set("view engine","ejs"); //set middleware for view engine;
// Agar views folder ka name change kar diya for example htmlTemplates ya or bhi kuch to manually set karna padega view engine folder name for example
// App.set('views', '../htmlTemplates');
//......................folder name.......


App.get("/",(req:Request,res:Response)=>{
    console.log(req.headers);
    res.send("Hello world from express server default get method slash / route");
});

//multiple params accepts example
App.post('/user/:id/:name',(req:Request,res:Response)=>{
    console.log(req.params);
    res.status(200).send("Data send successfully");
});

//accepts query params multiple example
App.get('/search',(req:Request,res:Response)=>{
    console.log(req.query); //log all query params
    //if you sure that query param is exist then use queryParam name depend your situation
    //use if else statement for better control
    if(req.query.name && req.query.age)
    {
        const name = req.query.name;
        const age = req.query.age;
        res.status(200).send(`<h3> Search Query Name : ${name}<br>Search Query Age : ${age} </h3>`)
        res.end(); //end response here
    }
    
    res.status(200).send(`<h3>query params ${JSON.stringify(req.query)} </h3> `);
});

App.get('/about',(req:Request,res:Response)=>{
    // res.send();  //send method text,html,objects,array,buffer ko send karta hai as a response
    // res.json() // JSON (Javascript object notation) ko send karta hai only
    // res.jsonp() // ye bhi json hi send karta hai lakin different origin ko agar json se compare krte hai to ye week method hai isko hmm na ka barabar use karete hai

    // res.redirect('https://montukharb.netlify.app/');
    //res.redirect('..');  double dot se one step previous history route ma redirect hota hai.
    // res.redirect(301,'https://montukharb.netlify.app/'); //first parameter optional hota hia second ma redirect route pass hota hai ya fir any website url 
    /* redirect code pass karne se redirection ma koi difference nahi aye ga kyuki ye bas indextion hoti hai search engines ka liya jaise google yahoo etc
    There are some redirection code 
    1. 301 permanent redirection
    2. 302 temporary redirection
    3. 303 A temporary redirection used after POST or PUT operation.
    4. 307 A temporary redirect similar to 302 but better for sites with non-Get operations.
    5. 308 ye 307 ka jaise hi hai counterpart

    Note: main 301,302,303 hi use hote hai mostly 99% of the time.   
    */
   res.send("About page")
});

App.post('/requestTest/',(req:Request,res:Response)=>{

    // if(req.accepts('html'))
    // {
    //     res.send("<h1>Request Test Page</h1>");
    //     res.end();
    // }
    // else if(req.accepts('json'))
        // {
            res.send({
                params:req.params,
                query:req.query,
                body:req.body, //return request body data
                cookies:req.cookies, //return cookie object
        hostname:req.hostname, //return host name like localhost  or google.com
        ip:req.ip, //return ip address
        ips:req.ips, //return array of ip addresses multiple server run ho rahe hai unko manage karne ka liya
        method:req.method, //return http method like GET,POST,PUT,DELETE
        originalUrl:req.originalUrl, //return complete url like /requestTest?name=montukharb agar query param ho to sab ko return kare ga
        path:req.path, //return only current route path like /requestTest
        protocol:req.protocol, //return http or https
        secure:req.secure, //return true or false
        route:req.route, //return current route object
        headers:req.headers, //return request headers
        // requestFormat:req.is(applicatoin/json)//  if else use karke check jo user ki request aa ri ha server kya wo json ka format hai ya normal text.
        
    })
    // res.end();
// // }
// else if(req.accepts('text'))
//     {
//         res.send("Request Test Page");}
//         res.end();
})

App.get('/landing',(req:Request,res:Response)=>{
    res.render('landing');
})

App.post('/createUser',async(req:Request,res:Response)=>{
   
   let data = "montu";
   type dataType = {
    name:string,
    age:number,
    email:string,
    lastmodified?:Date,

   }
   const data2:dataType = {
       name : req.body.name,
       age: req.body.age,
       email:req.body.email,
   };

   try{
       let result:any =  await dbConnection.userCollection.insertOne(data2);
       
       res.status(400).send({
        status: true,
        message: "User created successfully",
        data: result,
       })
    }
    catch(error:any)
    {
         if(error.code === 11000)
         {
             res.status(400).send({
                status:false,
                message:"User already exists",
                data:error,
             })
         }

         res.status(500).send({
            status:false,
            message:"Something went wrong",
            data:error,
         })
    }
     
    
})


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
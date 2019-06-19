// //moment is used to display  time. for that we have to install moment package by writting "npm install moment" in terminal.
const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./logger');
const PORT = process.env.PORT || 5000;
const members = require('./members');

//middleware
//init middleware
// app.use(logger);


//handlebars middleware
app.engine('handlebars',exphbs({defaultLayout:'main'}));
app.set('view engine','handlebars');




//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));


//handlebar middleware // home page route
app.get('/',(req,res) => res.render('index',{
    title:"hello",
    members
}))


//Set Static Folder   //in this we can access the css file. so that we need to link our css file with html file.
app.use(express.static(path.join(__dirname,'public')));    //for this whenever we run at that time we need to write "(localhost:5000/prit1.html)" ...prit1.html is a file inside the public folder. so that we can create as many html pages as we want.


//Members API Rouetes
app.use('/api/members',require('./route/api/members'));


// app.get('/',(req,res) => {   
//     res.sendFile(path.join(__dirname,'public','prit1.html'))
// });

app.listen(PORT,()=>console.log(`server started on port ${PORT}`));

// npm start
//npm i express morgan nodemon ejs body-parser dotenv mongoose axios

// Criando o servidor //npm start para rodar

const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');

const connectDB = require('./server/database/connection')

const res = require('express/lib/response');

const app=express();

dotenv.config({path: 'config.env'});
const PORT = process.env.PORT || 3000;

//Log requests
app.use(morgan('tiny'));

//mongodb connection
connectDB();

// Parse request to body-parser
app.use(bodyparser.urlencoded({extended: true}));

// set view engine
app.set("view engine","ejs");
//app.set("views",path.resolve(__dirname, "views/ejs"));

//load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))


//Load routers
app.use('/',require('./server/routes/router'))

app.listen(PORT, ()=>{console.log(`O servidor está rodando no http://localhost:${PORT}`)});


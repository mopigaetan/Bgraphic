const express =require('express');
const bodyParser=require('body-parser');
const cors =require('cors');
const app=express();
require('dotenv').config();
require('./db-connect.js');
const service=require('./routes/service.route.js');
const realisation=require('./routes/realisation.route.js');
const article=require('./routes/article.route.js');
const Devis=require('./routes/devis.route.js');
/*****cors error protection and data parsing*****/
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use(cors());
app.use(bodyParser.json({limit:"50mb",extended: true, parameterLimit:50000}));

app.use('/',service);
app.use('/',realisation);
app.use('/',article);
app.use('/',Devis);
app.get('/',(req,res,next)=>{
  res.status(200).json('hello world')
});






app.listen(process.env.PORT||50001,()=>console.log(`server is running on port ${process.env.PORT}`))
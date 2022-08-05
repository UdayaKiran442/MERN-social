const { urlencoded } = require('express');
const express = require('express');
const app = express()
const cookieParser = require('cookie-parser')
//using middlewares
app.use(express.json());
app.use(urlencoded({extended:true}))
app.use(cookieParser())
//using routes
app.use('/api/v1',require('./routes/post'));
app.use('/api/v1',require('./routes/user'));
module.exports = app;
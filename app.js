const express = require('express');
const path    = require('path');
const bodyparser= require('body-parser');
const cors    = require('cors');
const mongoose= require('mongoose');
const passport= require('passport');

const user = require('./model/user');
const config = require('./config/database');

mongoose.connect(config.database);

const app = express();

const users = require('./routes/users');

app.use(cors());


//set Static Folder 
app.use(express.static(path.join(__dirname,'public')));


//Body parser middleware 
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

//index page
app.get('/',(req,res)=>{
    res.send('Invalid endpoint');
});


app.use('/users',users)


//Index Route
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/index.html'));
})

//start server 
app.set('port',(process.env.PORT || 8080))
app.listen(app.get('port'), ()=>{
    console.log('Server started at 3000');
});
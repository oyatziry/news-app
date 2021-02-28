require('dotenv').config();
const express = require('express');
const axios = require("axios")
const layouts = require('express-ejs-layouts');
const session = require('express-session');
const flash = require("connect-flash")
const passport = require('./config/ppConfig');
const isLoggedIn = require('./middleware/isLoggedIn');
const methodOverride = require('method-override');
const db = require("./models");

const app = express();

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);

app.use(session({
  // a string used to generate a unique 
  // session ID cookie to share with the browser
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true 
}))

// the following two lines must appear after configuring the session
app.use(passport.initialize())
app.use(passport.session())

// FLASH
app.use(flash())
// adds a method to the req object for universal access

// Set up local variables (data that's accessible from anywhere in the app)
app.use((req, res, next) => {
  // before every route is loaded, attach flash messages and the 
  // current user to res.locals
  res.locals.alerts = req.flash()
  res.locals.currentUser = req.user

  next()
})


app.get('/',function(req,res){
  const apiUrl = 'https://newsapi.org/v2/top-headlines'
  axios.get(apiUrl,{
      params: {
          q: req.query.phrase || "us",
          language: 'en',
          apikey: process.env.API_KEY,
          category : req.query.category || "general"
      }
  }).then((responseData)=>{
    res.render('index',{topNews:responseData.data.articles})
  })
})
// after we logged in 
app.get('/main',isLoggedIn, function(req,res){
  const apiUrl = 'https://newsapi.org/v2/top-headlines'
  axios.get(apiUrl,{
      params: {
          q: req.query.phrase || "us",
          language: 'en',
          apikey: process.env.API_KEY,
          category : req.query.category || "general"
      }
  }).then((responseData)=>{
      res.render('main',{topNews:responseData.data.articles})
  })
})

app.use('/profile', require('./routes/profile'))
app.use('/bookmarks', require('./routes/bookmarks'))
app.use('/auth', require('./routes/auth'));

var server = app.listen(process.env.PORT || 3000, ()=> console.log(`🎧You're listening to the smooth sounds of port ${process.env.PORT || 3000}🎧`));

module.exports = server;

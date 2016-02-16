#!/usr/bin/env node

var express      = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser')
var signature = require('cookie-signature');
var hbs  = require('express-handlebars');

var port = 3000;

var app = express();
app
  .engine('hbs', hbs({
    layoutsDir: __dirname + '/layouts',
    defaultLayout: __dirname + '/layouts/default',
    extname: '.hbs'
  }))
  .set('view engine', 'hbs')
  .set('views', __dirname + '/views')
  .use(cookieParser())
  .use(session({ 
    secret: 'keyboard cat', 
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true
  }))
  .use(express.static(process.cwd() + '/public'));

app.get('/', function(req,res,next) {
  res.render('index');
});

app.post('/cookie-test.json', function(req,res,next) {
  var cookieNames = Object.keys(req.cookies);
  console.log('Cookies: ' + JSON.stringify(cookieNames, 2));
  
  if (cookieNames.length > 0) {  
    return res.json({hasCookie: true});
  }
  
  res.json({hasCookie: false});
})

app.listen(port, function() {
  console.log('\nServer started!\n');
  console.log('  1) Open your browser and clear your cookies for 127.0.0.1/localhost');
  console.log('  2) Point your browser at http://127.0.0.1:3000');
});


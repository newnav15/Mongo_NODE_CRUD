/***************************************************************************/
// Filename: app.js
// Created By: Naveen
// Description: 
//
/***************************************************************************/

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  //app.use(express.static(path.join(__dirname, 'public')));
 // app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.static(path.join(__dirname, 'library')));
  
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

/**
*
* Define the route handlers
**/
app.get('/', routes.index);
app.get('/getCreateForm', routes.getCreateForm);
app.get('/getUpdateForm', routes.getUpdateForm);
app.get('/getDeleteForm', routes.getDeleteForm);

app.post('/createEmployee', routes.createEmployee);
app.get('/readEmployees', routes.readEmployeesData);
app.get('/updateEmployee', routes.updateEmployee);
app.get('/deleteEmployee', routes.deleteEmployee);

app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

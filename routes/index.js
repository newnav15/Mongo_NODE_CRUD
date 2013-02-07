/***************************************************************************/
// Filename: app.js
// Created By: Naveen
// Description: 
//
/***************************************************************************/

var mongoose = require('mongoose');


//Connect to mongo DB
mongoose.connect('mongodb://' + "localhost" + '/mysystem');
var myDB = mongoose.connection;

//Error handling if conncetion fails 
myDB.on('error', console.error.bind(console, 'connection error:'));
//Check if successful connection is made
myDB.once('open', function callback () {
  console.log("MY DB Connected with Mongoose");
});

//create an employee schema for operation with mongo
employeeSchema = mongoose.Schema(
	{
    employeeid: String,
	name: String,
	address : String,
    created : Date,
    updated : Date
	},
	{
	collection:'employees'
	}
);

// model reference
employees = mongoose.model('employees', employeeSchema);

/*********************************************************************************************************************/

/**
*
*Create Employee 
**/
function createEmployee(employeeid, name, address, callback)
{
	var objLog = new employees();
	
	objLog.employeeid = employeeid;
	objLog.name = name;
	objLog.address = address;
	objLog.created = new Date();
	objLog.updated = new Date();
	 
 	objLog.save(function (error, result) {
	  callback(error, result);
	});
 }
 
/**
*
*Read Employees
**/
function readEmployees(callback)
{
	employees.find({},function (error, result) {
	  callback(error, result);
	});
	
 }


/**
*
* Update Employee 
**/
function updateEmployee(_id, name, address, callback)
{
	employees.findById(_id, function (err, item) {
	  if (err){
	  	callback(err, null); 
	  }
	  else {
	  	item.updated = new Date();
    	item.name = name;
    	item.address = address;
	  	item.save(function (err, result) {
		  callback(err, result);
		});
	  }
	});
 }
 
/**
*
* Delete Employee 
**/
function deleteEmployee(_id,callback)
{
	employees.findById(_id, function (err, item) {
	  if (err){
	  	callback(err, null); 
	  }
	  else {
	  	employees.remove(item,function (err, result) {
		  callback(err, result);
		});
	  }
	});
 }

/*********************************************************************************************************************/


exports.createEmployee = function(req, res){
	//console.log("data is ......"+req.body.employeeName);
	createEmployee(req.body.employeeId,req.body.employeeName,req.body.employeeAddress, function(error,result){
	  	if (error) {
                res.send({'result':'error'});
        }else {	            	
	    		console.info(" result:"+ JSON.stringify(result));
	    		 readEmployeesData(req, res);
	    }
	});
}

 function readEmployeesData(req, res){
	readEmployees(function(error,result){
	  	if (error) {
                res.send({'result':'error'});
        }else {	            	
	    		console.info(" result:"+ JSON.stringify(result));
	    		 res.render('read',{title:'Reading from Mongo DB now ........',"result": JSON.stringify(result)});
	    }
	});
}

exports.readEmployeesData = readEmployeesData;

exports.updateEmployee = function(req, res){
	console.log("data is .............."+req.query['_id']+"..........."+req.query['address']+"..............."+req.query['name']);
	updateEmployee(req.query['_id'],req.query['name'],req.query['address'], function(error,result){
	  	if (error) {
                res.send({'result':'error'});
        }else {	            	
	    		console.info(" result:"+ JSON.stringify(result));
	    		 res.send('Data Updated');
	    }
	});
}

exports.deleteEmployee = function(req, res){
	//console.log("in here.................."+req.query['_id']);
	deleteEmployee(req.query['_id'],function(error,result){
	  	if (error) {
                res.send({'result':'error'});
        }else {	            	
	    		console.info(" result:"+ JSON.stringify(result));
	    		 res.send('Data Deleted');
	    }
	});
}

/*********************************************************************************************************************/

exports.getCreateForm = function(req,res){
	res.render('createForm');

}

exports.getDeleteForm = function(req,res){
	readEmployees(function(error,result){
	  	if (error) {
                res.send({'result':'error'});
        }else {	            	
	    		//console.info(" result:"+ JSON.stringify(result));
	    		 res.render('delete', { title: 'Deleting records',"result": JSON.stringify(result) });
	    }
	});
}

exports.getUpdateForm = function(req,res){
	readEmployees(function(error,result){
	  	if (error) {
                res.send({'result':'error'});
        }else {	            	
	    		//console.info(" result:"+ JSON.stringify(result));
	    		 res.render('update', { title: 'Updating records',"result": JSON.stringify(result) });
	    }
	 });
}

exports.index = function(req, res){
	 res.render('layout', { title: 'Mongo-Node-Jade-CRUD Example' });
};
/*********************************************************************************************************************/




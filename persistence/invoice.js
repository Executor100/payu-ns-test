/**
 * Created by USER on 13/04/2017.
 */



var database = require("./config/db");
var deasync = require('deasync');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/"+database;

module.exports.insertInvoice = function(data){
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  db.collection("invoice").insertOne(data, function(err, res) {
	    if (err) throw err;
	    console.log("1 record inserted");
	    db.close();
	  });
	});
};

module.exports.getAllInvoice = function(){
	var listInvoice;
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  db.collection("invoice").find({}).toArray(function(err, result) {
	    if (err) console.log(err);//throw err;
	    listInvoice = result;
	    db.close();
	  });
	});
	while(listInvoice === undefined) {
    		deasync.runLoopOnce();
  		}
	return listInvoice;
};
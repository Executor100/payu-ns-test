/**
 * Created by USER on 13/04/2017.
 */



var database = require("./config/db");
var deasync = require('deasync');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/"+database;

module.exports.getAllProducts = function(){
	var listProducts;
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  db.collection("products").find({}).toArray(function(err, result) {
	    if (err) throw err;
	    console.log(listProducts);
	    listProducts = result;
	    db.close();
	  });
	});
	while(listProducts === undefined) {
    		deasync.runLoopOnce();
  		}
	return listProducts;
};
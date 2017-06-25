/**
 * Created by USER on 13/04/2017.
 */



var database = require("./config/db");
var deasync = require('deasync');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/"+database;

module.exports.getAllRates = function(){
	var listRates;
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  db.collection("rates").find({}).toArray(function(err, result) {
	    if (err) throw err;
	    listRates = result;
	    db.close();
	  });
	});
	while(listRates === undefined) {
    		deasync.runLoopOnce();
  		}
	return listRates;
};

module.exports.updateRates = function(data){
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var myquery = { id: data.id};
		//var newvalues = { name: "Mickey", address: "Canyon 123" };
		var newvalues = { $set: { value: data.value, fecha: data.fecha  } };
		db.collection("rates").updateOne(myquery, newvalues, function(err, res) {
		if (err) throw err;
		console.log("1 record updated");
		db.close();
		});
	});
}
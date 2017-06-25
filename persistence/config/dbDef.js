var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/geekdb";

MongoClient.connect(url, function(err, db) {
  if (err) console.log(err);
  //db.dropDatabase();
  /*db.close();
});


MongoClient.connect(url, function(err, db) {
  if (err) console.log(err);*/
  console.log("Database geekdb created!");
  /*db.close();
});

MongoClient.connect(url, function(err, db) {
	if (err) console.log(err);*/
  	db.createCollection("invoice", function(err, res) {
    	if (err) console.log(err);
    	console.log("Table invoice created!");
	});
	/*db.close();
});
MongoClient.connect(url, function(err, db) {
	if (err) console.log(err);*/
  	db.createCollection("products", function(err, res) {
  		if (err) console.log(err);
    	console.log("Table products created!");
    });
/*    db.close();
});

MongoClient.connect(url, function(err, db) {
	if (err) console.log(err);*/
  	db.createCollection("rates", function(err, res){
  		if (err) console.log(err);
    	console.log("Table rates created!");
  	});
  	/*db.close();
});

MongoClient.connect(url, function(err, db) {
	if (err) throw err;*/
    var myobj = [
	    { "id": 1, "nombre": "Maestro Yoda", "precio": 75000, "moneda": "COP" },
	    { "id": 2, "nombre": "Sable laser de plástico","precio": 35,"moneda": "USD"},
	    { "id": 3, "nombre": "Nave espacial Halcón Milenario", "precio": 125000, "moneda": "MXN" },
	    { "id": 4, "nombre": "Estrella de la muerte", "precio": 200, "moneda": "USD" },
	    { "id": 5, "nombre": "R2D2 en fichas de Lego","precio": 450,"moneda": "MXN"},
	    { "id": 6, "nombre": "Jar Jar Binks Gobernador", "precio": 800, "moneda": "MXN" },
	];
	db.collection("products").insertMany(myobj, function(err, res) {
		if (err) throw err;
		console.log("Number of records inserted: " + res.insertedCount);
	});
	/*db.close();
});
MongoClient.connect(url, function(err, db) {
	if (err) throw err;*/
	myobj = [
		{ "id": 1, "nombre": "COP", "value": 1, "fecha":"2017-06-05"},
		{ "id": 2, "nombre": "USD", "value": 3021.38, "fecha":"2017-06-05"},
		{ "id": 3, "nombre": "MXN", "value": 167.8295, "fecha":"2017-06-05"}
	];
	db.collection("rates").insertMany(myobj, function(err, res) {
		if (err) throw err;
		console.log("Number of records inserted: " + res.insertedCount);
	});
    db.close();
});

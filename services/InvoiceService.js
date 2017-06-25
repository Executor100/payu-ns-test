/**
 * Created by USER on 13/04/2017.
 */

var invoices=[];
var request = require('request');
var deasync = require('deasync');
var dbInvoice = require("../persistence/invoice");
var dbRates = require("../persistence/rates");

module.exports.createInvoice = function (req, res){
    var data =  req.body.products;
    invoices.push(data);
    console.log("Body " + req.body);
    console.log("Invoices" + invoices);
    var bill = { id: Math.floor((Math.random() * 100) + 1), products:[], subtotal:0, iva: 0, total: 0 };
    var subtotal=0;
    for (var i =  0 ; i < data.length; i++) {
    	data[i].value = GetRates(data[i].currency,data[i].value);
    	bill.products.push( { id: i+1,  name: data[i].name, quantity: data[i].quantity , value: data[i].value, amount: Number(data[i].quantity * data[i].value).toFixed(3) });
		bill.subtotal+= (data[i].quantity * data[i].value);
    }
   
    bill.iva = (bill.subtotal * 0.19);
    bill.total = (bill.subtotal + bill.iva);
    bill.subtotal=bill.subtotal.toFixed(3); 
    bill.iva = bill.iva.toFixed(3);
    bill.total = Number(bill.total).toFixed(3);
    dbInvoice.insertInvoice(bill);
    //TODO send the data of the invoice as answer
    res.status(200).jsonp(bill);
};

module.exports.getAllInvoice = function(req, res){
	var data = dbInvoice.getAllInvoice();
	res.status(200).jsonp(data);
};


//Get rates to convert currency to COP
function GetRates(currency, value){
	var valueRate;
	if(currency != "COP"){
		var rates = dbRates.getAllRates();
		var f1 = new Date();
		var f2;
		f1.setHours(0,0,0,0);
		for (var i = 0; i < rates.length;i++) {
			if(rates[i].nombre === currency){
				var res = rates[i].fecha.split("-");
				f2 = new Date(res[0], res[1]-1, res[2]);
				f2.setHours(0,0,0,0);
				//If the exchange rate is not updated, call the api and update
				if (f1.getTime() != f2.getTime()){
					rates[i].fecha = ""+f1.getFullYear() + "-" + (f1.getMonth() +1) + "-" +f1.getDate();
					rates[i] = updateRate(rates[i]);
				}
				valueRate = rates[i].value * value;
				return Number(valueRate).toFixed(3);
			}
		}
  		return valueRate.toFixed(3);
	}else{
		return value;
	}
};	

function updateRate(rate){
	var valueRate;
	//Google service to get exchange rates.
	var URL = "https://www.google.com/finance/converter?a=1&from="+rate.nombre+"&to=COP";
	request(URL, function(err, resp, body) {
		valueRate = body.substring(body.indexOf("<span class=bld>")+16, body.indexOf("COP</span>")).trim();
		if(!isNaN(valueRate)){
			rate.value = Number(valueRate);
			dbRates.updateRates(rate);
		}
	});
	//Wait to finish the query to google service
	while(valueRate === undefined) {
		deasync.runLoopOnce();
	}
	return rate;
}



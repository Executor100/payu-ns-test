/**
 * Created by USER on 14/04/2017.
 */


var invoiceService = require("../services/InvoiceService");
var productService = require("../services/ProductService");


exports.createInvoice = function (req, res) {

    invoiceService.createInvoice(req, res);
};

exports.getAllInvoice = function(req, res){

	invoiceService.getAllInvoice(req, res);
};


exports.getAllProducts= function(req, res){

	productService.getAllProducts(req, res);
};
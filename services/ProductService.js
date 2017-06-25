/**
 * Created by USER on 13/04/2017.
 */

var dbProducts = require("../persistence/products");

module.exports.getAllProducts = function(req, res){
	var data = dbProducts.getAllProducts();
	res.status(200).jsonp(data);
};
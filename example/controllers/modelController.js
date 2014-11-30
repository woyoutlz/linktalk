var models = require("../models/activity");
var cool={};

cool.say = function(){
	return "yangsyu";
};
cool.some2 = function(req,res,next){
	console.log("haha2");
	models.connect();
	models.find(function(){
		models.disconnect();
	});
	// models.disconnect();
	next();
};
cool.addPost = function(obj,callback){
	console.log("add");
	models.connect();
	models.addPost("yangyu",function(){
		models.disconnect();
		callback();
	});
	
};
cool.add = function(req,res,next){
	console.log("add");
	models.connect();
	// models.addPost("yangyu",function(){
	// 	models.disconnect();
	// });
	models.find(function(){
		models.disconnect();
	});
	next();
	
};
module.exports = cool;
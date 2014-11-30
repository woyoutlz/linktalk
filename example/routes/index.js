var express = require('express');
var router = express.Router();
var modelC = require('../controllers/modelController');
/* GET home page. */
var some1 = function(req,res,next){
	console.log("haha");
	next();
};


router.get('/',function(req, res) {
  res.render('index', { name: 'Express' });
});
router.post('/addpost',function(req,res){
	console.log(req.body);
	modelC.addPost(req.body,function(){
		res.send("add post ok");
	});
	// res.render('index', { name: 'postExpress' });
	// res.json(req.body);
});
router.get('/haha/:age', function(req, res) {
	console.log(req.params.age);
  res.render('index', { name: req.params.age});
});
router.get('/rest', function(req, res) {
	var name = cool.say();
	res.header("Access-Control-Allow-Origin", "http://127.0.0.1:8000");
	// console.log(req.params.age);
  res.json({name:name,age:25});
});
module.exports = router;

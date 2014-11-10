var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { name: 'Express' });
});
router.get('/haha/:age', function(req, res) {
	console.log(req.params.age);
  res.render('index', { name: req.params.age});
});
router.get('/rest', function(req, res) {
	res.header("Access-Control-Allow-Origin", "http://127.0.0.1:8000");
	// console.log(req.params.age);
  res.send({name:"yangyu",age:25});
});
module.exports = router;

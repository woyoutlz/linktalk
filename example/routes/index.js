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
module.exports = router;

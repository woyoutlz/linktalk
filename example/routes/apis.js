module.exports = function(passport){
	var express = require('express');
	var router = express.Router();
	var modelC = require('../controllers/modelController');
	/* GET home page. */
	var help = require('../controllers/helperController');
	router.use(function(req,res,next){
		res.header("Access-Control-Allow-Origin", "http://127.0.0.1:8000");
		res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
		res.header("Access-Control-Allow-Credentials",true);
		next();
	});


	router.get('/',function(req, res) {
		res.send("欢迎使用api");
	});
//login
router.post('/login',function(req,res,next){
	passport.authenticate('local', function(err, user, info) {
		if (err) { return next(err); }
		if (!user) { return res.send(info); }
		req.logIn(user, function(err) {
			if (err) { return next(err); }
			console.log(help.hehe);
			return res.send({message:"success"});

		});
	})(req, res, next);
});
// router.post('/login',passport.authenticate('local'),function(req,res){
// 	res.send("ok");
// });
//logout
router.get('/logout',function(req,res){
	if(req.isAuthenticated()){
		console.log("login out now");
	}
	req.logout();
	res.send({ret:0,message:"logout"});
});
//-------------------post
router.post('/addpost',function(req,res){
	console.log(req.body);
	// res.send("ress");
	if(req.isAuthenticated()){
		var post = {
			user:{
				userName:req.user.username,
				userID:12345
			},
			time:new Date(),
			action:{
				what:"post",
				contents:{
					postContents:req.body.content,
					postTitle:req.body.title,
					atomLinkUrl:req.body.atomUrl,
					zans:0,
					tag:req.body.tag
				}
			}
		};
		modelC.addPost(post,function(){
		res.send({ret:0});
	});

	}else{
		res.send("还没授权");
	}

});
router.get('/getposts',function(req,res){
	console.log(req.query);
	// res.send("ress");

		modelC.getPosts(req.query,function(posts){
		res.send({ret:0,posts:posts});
	});

});
//--------------------comments

router.post('/addcomment',function(req,res){
	console.log("router:addcomment");
	var commentObj = req.body;
	if(req.isAuthenticated()){
		commentObj.userName = req.user.username;
		modelC.addComment(commentObj,function(){
		res.send({ret:0});
	});
}
	
	else{
	res.send({ret:1,message:"没授权"});
	}
});
router.get('/getcomments',function(req,res){
	console.log(req.query);
	// res.send("ress");

		modelC.getComments(req.query,function(comments){
		res.send({ret:0,comments:comments});
	});
});
//-----------------zans
router.post('/zanpost',function(req,res){
	console.log("router:zanpost");
	var zanObj = req.body;
	if(req.isAuthenticated()){
		zanObj.userName = req.user.username;
		modelC.zanPost(zanObj,function(){
		res.send({ret:0});
	});
}
	
	else{
	res.send({ret:1,message:"没授权"});
	}
});
//-----user activity
router.get('/getuseractivity',function(req,res){
	console.log(req.query);
	// res.send("ress");

		modelC.getActivities(req.query,function(activities){
		res.send({ret:0,activities:activities});
	});
});
//-----------------test

router.get('/haha/:age', function(req, res) {
	console.log(req.params.age);
	res.render('index', { name: req.params.age});
});
router.get('/rest', function(req, res) {
	console.log(1);
	res.header("Access-Control-Allow-Origin", "http://127.0.0.1:8000");
	// console.log(req.params.age);
  // res.json({name:name,age:25});
  res.send("ok");
});
return router;
};

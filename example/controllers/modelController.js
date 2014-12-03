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
	console.log("mc: add post ");
	models.connect();
	models.addPost(obj,function(){
		models.disconnect();
		callback();
	});
	
};
cool.getPosts = function(obj,callback){
	console.log("get posts");
	models.connect();
	models.getPosts(obj,function(posts){
		models.disconnect();
		callback(posts);
	});
};
cool.addComment = function(obj,callback){
	console.log("mc:add comment");
	//查询获得post的内容
	// console.log(obj)
	models.connect();
	models.findPostByID(obj.postid,function(post){
		console.log(post)
		//将这个post的内容插入 
		obj.post = post;
		models.addComment(obj,function(){

			models.disconnect();
			callback();
		})

	});
	// models.addComment(obj,function(){
	// 	models.disconnect();
	// 	callback();
	// });
};
cool.getComments = function(obj,callback){
	console.log("get posts");
	models.connect();
	models.getComments(obj,function(comments){
		models.disconnect();
		callback(comments);
	});
}
cool.zanPost = function(obj,callback){
	console.log("mc:zan post");
	//赞获得post
	// console.log(obj)
	models.connect();
	models.zanPostByID(obj.postid,function(num){
		console.log(num)
		//将这个post的内容插入 
		 models.getEasyPostByid(obj.postid,function(post){
		 	console.log(post);
		 	obj.post = post
		 	models.addAZan(obj,function(){
		 		models.disconnect();
			callback();
		 	})
			
		});
		
		// models.addComment(obj,function(){

		// })

	});
}
cool.getActivities = function(obj,callback){
	models.connect();
	models.getActivities(obj,function(activity){
		models.disconnect();
		callback(activity);
	});
}
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

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/yangyu');
var redis = require("redis");
var redisClient;
//
function redisbegin(){
  redisClient = redis.createClient();
}
function redisEnd(){
  redisClient.quit();
}
exports.connect = function(callback) {
  // mongoose.connect('mongodb://localhost/yangyu');
  console.log("connect db");
};

exports.disconnect = function(callback) {
  // mongoose.disconnect(callback);
};

//

var postSchema = mongoose.Schema({
  user:{
    userName:String,
    userID:Number
  },
  time:Date,
  action:{
    what:String,
    contents:{
      postContents:String,
      postTitle:String,
      atomLinkUrl:String,
      zans:Number,
      tag:String
    }
  }
});
var commentSchema = mongoose.Schema({
  user:{
    userName:String,
    userID:Number
  },
  action:{
    what:String,
    contents:{
      post:{
        id:String,
        title:String,
        user:{
          userName:String,
          userID:Number
        }
      },
      contents:String
    }

  },
  time:Date
});
var activitySchema = mongoose.Schema({
  user:{
    userName:String,
    userID:Number
  },
  action:Object,
  time:Date
});
// activitySchema.methods.speak = function () {
//   var greeting = this.name
//     ? "Meow name is " + this.name
//     : "I don't have a name"
//   console.log(greeting);
// };
// var Post = mongoose.model('activity', postSchema);
// var Comment = mongoose.model('activity', activitySchema);
var Activity = mongoose.model('activity', activitySchema);

exports.addPost = function(postObj,callback){
  // var newPost = new Activity({
  //   user:{
  //   userName:"yangyu",
  //   userID:12345
  //   },
  //   time:new Date(),
  //   action:{
  //     what:"post",
  //     contents:{
  //       postContents:"这是一个post的内容",
  //       postTitle:"这是一个post的title",
  //       atomLinkUrl:"b1p1",
  //       zans:20,
  //       tag:"res"
  //     }
  //   }
  //  });
var newPost = new Activity(postObj);
  console.log(newPost); // 'Silence'
  newPost.save(function (err, fluffy) {
    if (err) return console.error(err);
  // silence.speak();
  callback();
});

};
exports.getPosts = function(getObj,callback){
  console.log(getObj);
  Activity.find({"action.what":"post","action.contents.atomLinkUrl":getObj.atomUrl},function (err, posts) {
    if (err) return console.error(err);
    console.log(posts);
    callback(posts);
  });
};
//
exports.findPostByID = function(postid,callback){
  console.log(postid);
  Activity.findOne({"_id":postid},function (err, post) {
    if (err) return console.error(err);
    // console.log(post);
    callback(post);
  });
}
exports.addComment = function(obj,callback){
  var newComment = new Activity({
    user:{
      userName:obj.userName,
      userID:12345
    },
    action:{
      what:"comment",
      contents:{
        postid:obj.postid,
        post:obj.post,
        contents:obj.content
      }
      
    },
    time:new Date()
  });
   // console.log(newComment); // 'Silence'
   newComment.save(function (err, fluffy) {
    if (err) return console.error(err);
  // silence.speak();
  callback();
});
 };
 exports.getComments = function(obj,callback){
  console.log(obj);
  Activity.find({"action.what":"comment","action.contents.postid":obj.postid},function (err, comments) {
    if (err) return console.error(err);
    console.log(comments);
    callback(comments);
  });
};
exports.zanPostByID = function(postid,callback){
  var conditions = {"_id":postid};
  var update = { $inc: { "action.contents.zans": 1 }};
  // , options = { multi: true };
  Activity.update(conditions,update,function (err, num) {
    if (err) return console.error(err);
    // console.log(post);
    callback(num);
  });
}
exports.getEasyPostByid = function(postid,callback){
  redisbegin();
  redisClient.get("post:"+postid,function(err,res){
    if (res) {
      console.log("from redis");
     callback(JSON.parse(res));

   redisEnd();
   }else{
     Activity.findOne({"_id":postid},function (err, post) {
      if (err) return console.error(err);
    // console.log(post);
      callback(post);
     redisClient.set("post:"+postid,JSON.stringify(post),function(err,res){
        redisEnd();
     })
     });

   }

 })
}
exports.addAZan = function(obj,callback){
     var newZan = new Activity({
    user:{
      userName:obj.userName,
      userID:12345
    },
    action:{
      what:"zan",
      contents:{
        postid:obj.postid,
        post:obj.post
      }
      
    },
    time:new Date()
  });
   // console.log(newComment); // 'Silence'
   newZan.save(function (err, fluffy) {
    if (err) return console.error(err);
  // silence.speak();
  callback();
  });
}
exports.getActivities = function(obj,callback){
    console.log(obj);
  Activity.find({"user.userID":obj.userid},function (err, activities) {
    if (err) return console.error(err);
    console.log(activities);
    callback(activities);
  });
}
exports.find = function(callback){
  Activity.find({"action.what":"comment"},function (err, comments) {
    if (err) return console.error(err);
    console.log(comments);
    callback();
  });
};


// module.exports = models;
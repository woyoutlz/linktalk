
var mongoose = require('mongoose');

//
exports.connect = function(callback) {
    mongoose.connect('mongodb://localhost/yangyu');
    console.log("connect db");
};

exports.disconnect = function(callback) {
    mongoose.disconnect(callback);
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

exports.addPost = function(name,callback){
  var newPost = new Activity({
    user:{
    userName:"yangyu",
    userID:12345
    },
    time:new Date(),
    action:{
      what:"post",
      contents:{
        postContents:"这是一个post的内容",
        postTitle:"这是一个post的title",
        atomLinkUrl:"b1p1",
        zans:20,
        tag:"res"
      }
    }
   });
  console.log(newPost); // 'Silence'
  newPost.save(function (err, fluffy) {
  if (err) return console.error(err);
  // silence.speak();
  callback();
});

};
exports.addComment = function(obj,callback){
  var newComment = new Activity({
    user:{
    userName:"yangyu",
    userID:12345
  },
  action:{
    what:"comment",
    contents:{
      post:{
    id:"123",
    title:"哈哈哈",
    user:{
      userName:"yangran",
      userID:12346
    }
  },
  contents:"我也觉得很棒啊"
    }
      
  },
  time:new Date()
});
   console.log(newComment); // 'Silence'
  newComment.save(function (err, fluffy) {
  if (err) return console.error(err);
  // silence.speak();
  callback();
  });
};
exports.find = function(callback){
  Activity.find({"action.what":"comment"},function (err, comments) {
  if (err) return console.error(err);
  console.log(comments);
  callback();
  });
};


// module.exports = models;
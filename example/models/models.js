//db
var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/yangyu');
// var models = {};
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var dburl = require("../config").db;//数据库地址

exports.connect = function(callback) {
    mongoose.connect('mongodb://localhost/yangyu');
    console.log("connect db")
}

exports.disconnect = function(callback) {
    mongoose.disconnect(callback);
}

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function callback () {
//   // yay!
//   console.log("ok db");
// });
//

var kittySchema = mongoose.Schema({
    name: String
});
kittySchema.methods.speak = function () {
  var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name"
  console.log(greeting);
};
var Kitten = mongoose.model('Kitten', kittySchema);


exports.add = function(name,callback){
  var silence = new Kitten({ name: name });
  console.log(silence.name); // 'Silence'
  silence.save(function (err, fluffy) {
  if (err) return console.error(err);
  silence.speak();
  callback();
});

};
exports.find = function(callback){
  Kitten.find(function (err, kittens) {
  if (err) return console.error(err);
  console.log(kittens);
  callback();
  });
}


// module.exports = models;
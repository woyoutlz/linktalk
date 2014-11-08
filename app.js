var express = require('express');
var app = express();
/**
 * [路由]
 * @param  {[type]} req
 * @param  {[type]} res
 * @return {[type]}
 */
app.get('/hello.txt', function(req, res){
  res.send('Hello World');
});
/**
 * 启动server
 * 
 * @return {[type]}
 */
var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
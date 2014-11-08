var express = require('express');
var app = express();
swig = require('swig');
// This is where all the magic happens!
app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// Swig will cache templates for you, but you can disable
// that and use Express's caching instead, if you like:
app.set('view cache', false);
// To disable Swig's cache, do the following:
swig.setDefaults({ cache: false });
// NOTE: You should always cache templates in a production environment.
// Don't leave both of these to `false` in production!

app.get('/', function (req, res) {
  res.render('index', { /* template locals context */
  name:'yangyu'
   });
});

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
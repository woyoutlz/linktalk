var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exsession = require('express-session');
var routes = require('./routes/index');
var users = require('./routes/users');
var apisf = require('./routes/apis');
var app = express();

var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;


// var Kitten = mongoose.model('Kitten', kittySchema);
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
swig = require('swig');
// This is where all the magic happens!
// 
app.locals.title = "hello yany";

app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
//设置跨域
/*
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    // res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    // res.header("X-Powered-By",' 3.2.1');
    // res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
*/
//app.use 是每一个请求都会执行的中间件
// app.use(function(req,res,next){
//     console.log("good");
//     next();
// })
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(exsession({secret: 'link.me', cookie: { maxAge: 60000 }}));
app.use(passport.initialize());
app.use(passport.session());

//-----------
passport.use('local', new LocalStrategy(
    function (username, password, done) {

        var user = {
            id: '1',
            username: 'yangyu',
            password: '111111'
        }; // 可以配置通过数据库方式读取登陆账号

        if (username !== user.username) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (password !== user.password) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        console.log("授权ok");
        return done(null, user);
    }
));

passport.serializeUser(function (user, done) {//保存user对象
    done(null, user);//可以通过数据库方式操作
});

passport.deserializeUser(function (user, done) {//删除user对象
    done(null, user);//可以通过数据库方式操作
});


//--------------
app.use('/', routes);
app.post('/login', passport.authenticate('local'),function(req,res){
    res.send("login susees");
});
function islogin(req,res,next){
     if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
app.get('/user',islogin,function(req,res){

    res.send("hellp,"+req.user.username);
});
app.get('/logout',function(req,res){
     req.logout();
    res.redirect('/');
});
//------------------------------------
app.use('/api', apisf(passport));
// app.use('/users', users);

app.use('/bower', express.static(__dirname + '/bower_components'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
var help = require('./controllers/helperController');
console.log(help.hehe);
help.hehe = "yes";
process.on("exit",function(){
    console.log("我马上要关掉自己了:)");
});
module.exports = app;

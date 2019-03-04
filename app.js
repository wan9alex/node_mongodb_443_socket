var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require('cors');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser')
let multer  = require('multer');	//引入

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser());

//配置cors中间件
app.use(cors({
  "origin": ["http://localhost:8001","http://localhost:3000","http://127.0.0.1:8080","https://localhost:8001","https://localhost:3000","https://127.0.0.1:8080"],  //允许所有前端域名
  "credentials":true,//允许携带凭证
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE", //被允许的提交方式
  "allowedHeaders":['Content-Type','Authorization']//被允许的post方式的请求头
})); 

app.use(cookieSession({
  keys:['aa','bb'],
  name:'node_id',
  // maxAge:1000*60*60
}));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if(req.url.indexOf('product')!==-1){//根据请求地址的不同
      cb(null, path.join(__dirname, 'public',require('./config/global').upload.product));//public/product
    }
    if(req.url.indexOf('user')!==-1){
      cb(null, path.join(__dirname, 'public',require('./config/global').upload.user))
    }
  }
})

var objMulter = multer({ storage });//存储方式dest指定死了，storage分目录
// let objMulter = multer({ dest: path.join(__dirname, 'public/upload')});	//实例化  返回 multer对象
app.use(objMulter.any());  	//any 允许上传任何文件

app.use(express.static(path.join(__dirname, 'public/template')));

//给静态资源条件虚拟目录admin,
//views模板里面的/指向public/admin,加上管理端的响应正好是app.use('/admin/xx)
//所以ejs里面的/ 或者 ./ 或者 ../../都指向了public/admin
app.use('/admin',express.static(path.join(__dirname, 'public/admin/')));
app.use(express.static(path.join(__dirname, 'public')));

//管理端
app.use('/admin/reg', require('./routes/admin/reg'));
app.use('/admin/login', require('./routes/admin/login'));
app.use('/admin/error', require('./routes/admin/feedback/error'));
app.use('/admin/success', require('./routes/admin/feedback/success'));

app.all('/admin/*',require('./routes/admin/islogin'));//all后面要的是函数，不是路由

app.use('/admin', require('./routes/admin/home'));
app.use('/admin/home', require('./routes/admin/home'));
app.use('/admin/product', require('./routes/admin/product'));
app.use('/admin/banner', require('./routes/admin/banner'));
app.use('/admin/logout', require('./routes/admin/logout'));
app.use('/admin/user', require('./routes/admin/user'));

//客户端
app.use('/api/product', require('./routes/api/product'));
app.use('/api/detail', require('./routes/api/detail'));
app.use('/api/slider', require('./routes/api/slider'));

//代理
app.use('/proxy/top250', require('./routes/proxy/top250'));
app.use('/proxy/coming_soon', require('./routes/proxy/coming_soon'));
app.use('/proxy/in_theaters', require('./routes/proxy/in_theaters'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('./feedback/app_error');
  // res.redirect('/admin/error?msg=app检测到的错误，木有这个页面');//建议保留脚手架error.ejs模板，可得知错误来源
});

module.exports = app;

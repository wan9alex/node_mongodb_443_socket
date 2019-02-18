var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//管理端
app.use('/admin/home', require('./routes/admin/home'));

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
  res.render('error');
});

module.exports = app;

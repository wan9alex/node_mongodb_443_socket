var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log('home1',req.session)
  res.render('home', {
    active: 'index',
    username:req.session.username,
    icon:req.session.icon,
    page_header:'首页'
  });
});

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('user', { 
    dataName:'user',
    username:req.session.username,
    icon:req.session.icon,
    page_header:'用户'
  });
});

router.get('/super', function(req, res, next) {
  res.render('user', { 
    dataName:'user',
    username:req.session.username,
    icon:req.session.icon,
    page_header:'管理用户'
  });
});

module.exports = router;

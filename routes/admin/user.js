var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('user', { 
    home: '',
    product:'',
    user:'active',
    charts:'',
    forms:'',
    username:req.session.username,
    icon:req.session.icon,
    page_header:'用户'
  });
});

module.exports = router;

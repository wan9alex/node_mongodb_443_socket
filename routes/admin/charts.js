var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('charts', { 
    home: '',
    product:'',
    user:'',
    charts:'active',
    forms:'',
    username:req.session.username,
    icon:req.session.icon,
    page_header:'charts'
  });
});

module.exports = router;

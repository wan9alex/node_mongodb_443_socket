var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('product.........')
  res.render('product', { 
    home: '',
    product:'active',
    user:'',
    charts:'',
    forms:'',
    username:req.session.username,
    icon:req.session.icon,
    page_header:'商品'
  });
});

module.exports = router;

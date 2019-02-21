var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('forms', { 
    home: '',
    product:'',
    user:'',
    charts:'',
    forms:'active',
    username:req.session.username,
    icon:req.session.icon,
    page_header:'表单'
  });
});

module.exports = router;

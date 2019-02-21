var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  delete req.session['username_id'];
  res.redirect('/admin/login')
});

module.exports = router;

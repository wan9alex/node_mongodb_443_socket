var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./feedback/success', { msg: req.query.msg });
});

module.exports = router;

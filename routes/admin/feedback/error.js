var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log('error...........',req.query)
  res.render('./feedback/error', { msg: req.query.msg });
});

module.exports = router;

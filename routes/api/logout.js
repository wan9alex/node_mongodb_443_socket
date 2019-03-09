var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  delete req.session['username'];
  res.send({error:0,msg:'成功'})
});

module.exports = router;

var express = require('express');
var router = express.Router();

router.get('/',function(req, res, next) {
  let dataName=req.query.dataName;
  res.render('product_check', {
    active:dataName,
    ...res.user_session,
    page_header:dataName+'修改',
    page_data:[]
  });
});

module.exports=router;
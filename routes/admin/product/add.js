var express = require('express');
var router = express.Router();

router.get('/',function(req, res, next) {
  let dataName=req.query.dataName;
  res.render('product_add', {
    active:dataName,
    ...res.user_session,
    page_header:dataName + '添加',
    page_data:[]
  });
});

module.exports=router;
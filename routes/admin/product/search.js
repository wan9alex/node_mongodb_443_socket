var express = require('express');
var router = express.Router();
var mgd = require('../../../common/mgd');

router.get('/',function(req, res, next) {
  let dataName=req.query.dataName;
  let q=req.query.q;
  console.log('search........',q)

  let start = req.query.start-1||0;//后端默认 start=0/count=3
  let count = req.query.count-0||3;

  let common_data = {
    active:dataName,
    ...res.user_session,
    page_header:dataName,
  };

  mgd(
    {
      dbName:'newsapp',
      collection:dataName
    },
    (collection,client,ObjectId)=>{

      collection.find({
        title:eval('/'+ q +'/g')//正则里面放置变量
      },{
        limit:count,
        skip:start*count,
        projection:{
          _id:1,title:1,des:1
        }
      }).toArray((err,result)=>{
        res.render('product', {
          ...common_data,
          page_data:result,
        });
        client.close();
      })
    }
  );
});

module.exports=router;
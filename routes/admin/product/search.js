var express = require('express');
var router = express.Router();
var mgd = require('../../../common/mgd');

router.get('/',function(req, res, next) {
  let dataName=req.query.dataName;
  let q=req.query.q;
  let rule=req.query.rule;
  // console.log('search........',q)

  count = req.query.count ? req.query.count-0 : require('../../../common/global').page_num;//搜索页做分页

  let common_data = {
    active:dataName,
    ...res.user_session,
    page_header:dataName,
    active_page:1,
    q:q,
    rule:rule
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
        projection:{
          _id:1,title:1,des:1
        }
      }).toArray((err,result)=>{
        console.log('result',result.length)
        res.data={
          ...common_data,
          page_data:result,
          // page_count:Math.ceil(result.length/count)
        }
        // res.render('product',res.data);
        next();
      })
    }
  );
});

router.get('/',function(req, res, next) {
  let dataName=req.query.dataName;
  let q=req.query.q;
  count = req.query.count ? req.query.count-0 : require('../../../common/global').page_num;//搜索页做分页

  mgd(
    {
      dbName:'newsapp',
      collection:dataName
    },
    (collection,client,ObjectId)=>{

      collection.find({
        title:eval('/'+ q +'/g')//正则里面放置变量
      },{
        projection:{
          _id:1,title:1,des:1
        }
      }).toArray((err,result)=>{
        // console.log('result',result.length)
        res.data={
          ...res.data,
          page_count:Math.ceil(result.length/count)//指定查询返回页码，需加入async库，并考虑什么API直接返回指定搜索后的长度
        }
        res.render('product',res.data);
      })
    }
  );
});

module.exports=router;
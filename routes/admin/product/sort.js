var express = require('express');
var router = express.Router();
var mgd = require('../../../common/mgd');
var start=require('../../../common/global').page_start; //页数
var count = require('../../../common/global').page_num; //页数

router.get('/',function(req, res, next) {
  let dataName=req.query.dataName;
  let rule=req.query.rule;
  console.log('sort......',rule)

  start = req.query.start ? req.query.start-1 : start;//后端默认 start=0/count=3
  count = req.query.count ? req.query.count-0 : count;
  let q=req.query.q;
  let rule=req.query.rule;

  let common_data = {
    active:dataName,
    ...res.user_session,
    page_header:dataName,
    active_page:start+1,
    q,rule
  };

  mgd(
    {
      dbName:'newsapp',
      collection:dataName
    },
    (collection,client,ObjectId)=>{

      collection.find({},{
        limit:count,
        skip:start*count,
        projection:{
          _id:1,title:1,des:1
        },
        // sort:{_id:ObjectId(rule)}
        sort:{[rule]:1}
      }).toArray((err,result)=>{
        // console.log('sort.......',result)
        res.data={
          ...common_data,
          page_data:result,
        }
        
        collection.countDocuments((err,num)=>{
          // console.log('count........',err,num)
          // console.log('count........',res.data)
          res.data={
            ...res.data,
            page_count:Math.ceil(num/count)//计算总页数
          }
          // console.log('count......',res.data)
         
          res.render('product', res.data);
          client.close();
        })

      })
    }
  );
});


module.exports=router;
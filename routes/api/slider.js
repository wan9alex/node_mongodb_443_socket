var express = require('express');
var router = express.Router();
var mgd=require('../../common/mgd');


router.get('/', function(req, res, next) {

  let start = req.query.start-1;
  let count = req.query.count-0;
  
  mgd(
    {
      dbName:'newsapp',
      collection:'slider'
    },
    (news,client)=>{
      
      news.find({},{
        limit:count,
        skip:start*count,
        projection:{
          _id:0,detail:0
        }
      }).toArray((err,result)=>{
        console.log(result);
        if(result.length==0){
          res.send({error:1,msg:"无数据"})
        }else{
          res.send({error:0,msg:'成功',data:result})
        }
        client.close();
      })

    }
  )


});

module.exports = router;










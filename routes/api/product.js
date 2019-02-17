var express = require('express');
var router = express.Router();
var mgd=require('../../common/mgd');


router.get('/', function(req, res, next) {

  let start = req.query.start-1;
  let count = req.query.count-0;
  let dataName = req.query.dataName;

  if(!dataName) res.send({error:1,msg:'dataName为必传参数'})
  
  mgd(
    {
      dbName:'newsapp',
      collection:dataName
    },
    (news,client)=>{
      
      news.find({},{
        limit:count,
        skip:start*count,
        projection:{
          id:1,_id:0,title:1,des:1
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










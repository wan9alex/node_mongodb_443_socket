var express = require('express');
var router = express.Router();
var mgd=require('../../common/mgd');


router.get('/', function(req, res, next) {

  let id = req.query.id-0;
  let dataName = req.query.dataName;
  if(!dataName || !id) res.send({error:1,msg:'dataName和id为必传参数'})
  mgd(
    {
      dbName:'newsapp',
      collection:dataName
    },
    (collection,client)=>{
      collection.find({id:id},{projection:{_id:0,des:0,id:0}}).toArray((err,result)=>{
        if(result.length==0){
          res.send({error:1,msg:'无数据'})
        }else{
          console.log(result);
          result=result[0];
          let title=result.title;
          result={error:0,title,...result.detail}
          res.send(result)
        }
        
        client.close();
      })

    }
  )

});

module.exports = router;










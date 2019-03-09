var express = require('express');
var router = express.Router();
var mgd = require('../../common/mgd')

router.get('/',function(req, res, next) {
  let dataName=req.query.dataName;
  let _id=req.query._id;
  if(!dataName || !_id){
    res.send({error:1,msg:'dataName和_id为必传参数'})
    return;
  }

  mgd({
    collection:dataName
  },(collection,client,ObjectId)=>{
    collection.find({
      _id:ObjectId(_id)
    }).toArray((err,result)=>{
      if(!err && result.length>0){
        res.data={
          error:0,
          msg:'成功',
          data:result[0]
        }
        res.send(res.data);
      }else{
        res.send({error:1,msg:'查询无数据'});
      }
      client.close();
    })
  })

});


module.exports=router;
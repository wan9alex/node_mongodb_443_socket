var express = require('express');
var router = express.Router();
var mgd = require('../../../common/mgd');

router.get('/',function(req, res, next) {
  let _id = req.query._id||'';
  let start = req.query.start ? req.query.start-1 : require('../../../config/global').page_start-1;//后端默认 start=0/count=3
  let count = req.query.count ? req.query.count-0 : require('../../../config/global').page_num;
  let dataName = req.query.dataName
  let rule = req.query.rule||'';
  let q = req.query.q||'';
  // console.log('del..............',_id,req.query.dataName);//接收到的_id是字符，不能与库_id对照,库id是ObjectId对象
  //页面数据
  let common_data = {
    ...res.user_session,//cookie每次需要校验
    page_header:dataName,//标题
    start:start+1,
    q,rule,count,dataName
  };

  mgd(
    {
      collection:common_data.dataName
    },
    (collection,client,ObjectId)=>{

      collection.deleteOne({_id:ObjectId(_id)},(err,result)=>{
        console.log('del..............',result)
        if(!err && result.result.n){
          res.redirect('/admin/banner?dataName='+common_data.dataName+'&q='+common_data.q+'&start='+common_data.start+'&count='+common_data.count+'&rule='+common_data.rule)
        }else{
          res.redirect('/admin/error?msg=删除操作失败')
        }
        client.close();
      })

    }
  );
});

module.exports=router;
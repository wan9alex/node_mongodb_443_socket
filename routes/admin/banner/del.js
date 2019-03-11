var express = require('express');
var router = express.Router();
var mgd = require('../../../common/mgd');

router.get('/',function(req, res, next) {
  let {dataName,_id,start,q,rule,count} = res.params;
  if(!dataName || !_id){
    res.redirect('/admin/error?msg=dataName和_id为必传单数')
    return;
  }
  /* let start = req.query.start ? req.query.start-1 : require('../../../config/global').page_start-1;//后端默认 start=0/count=3
  let count = req.query.count ? req.query.count-0 : require('../../../config/global').page_num;
  let rule = req.query.rule||require('../../../config/global').rule;
  let q = req.query.q||require('../../../config/global').q; */
  // console.log('del..............',_id,req.query.dataName);//接收到的_id是字符，不能与库_id对照,库id是ObjectId对象
  //页面数据
  /* let common_data = {
    ...res.user_session,//cookie每次需要校验
    ...res.params,
    start:start+1,
  }; */

  mgd(
    {
      collection:dataName
    },
    (collection,client,ObjectId)=>{

      collection.deleteOne({_id:ObjectId(_id)},(err,result)=>{
        // console.log('del..............',result)
        if(!err && result.result.n){
          res.redirect('/admin/banner?dataName='+dataName+'&q='+q+'&start='+(start+1)+'&count='+count+'&rule='+rule)
        }else{
          res.redirect('/admin/error?msg=删除操作失败')
        }
        client.close();
      })

    }
  );
});

module.exports=router;
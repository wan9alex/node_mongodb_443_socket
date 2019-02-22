var express = require('express');
var router = express.Router();
var mgd = require('../../../common/mgd');

router.get('/',function(req, res, next) {
  let dataName = req.query.dataName||'home';
  let _id = req.query._id;
  console.log('del..............',_id);//接收到的_id是字符，不能与库_id对照,库id是ObjectId对象
  /* let common_data = {
    active:dataName,
    username:req.session.username,
    icon:req.session.icon,
    page_header:dataName + '删除成功'
  }; */

  mgd(
    {
      dbName:'newsapp',
      collection:dataName
    },
    (collection,client,ObjectId)=>{

      collection.deleteOne({_id:ObjectId(_id)},(err,result)=>{
        console.log('del..............',result)
        if(!err && result.result.n){
          res.redirect('/admin/product?dataName='+dataName)
        }else{
          res.redirect('/admin/error?msg=删除操作失败')
        }
        client.close();
      })

    }
  );
});

module.exports=router;
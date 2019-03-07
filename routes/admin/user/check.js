var express = require('express');
var router = express.Router();
var mgd = require('../../../common/mgd')
var uploadUrl = require('../../../config/global').upload.user;
var pathLib = require('path');
var fs = require('fs');

router.get('/',function(req, res, next) {
  let dataName=req.query.dataName;
  let _id=req.query._id;

  if(!_id || !dataName){
    res.redirect('/admin/error?msg=_id和dataName为必传参数')
    return;
  }
  
  let start=req.query.start||require('../../../config/global').page_start
  let q=req.query.q||require('../../../config/global').q;
  let rule=req.query.rule||require('../../../config/global').rule;
  let count=req.query.count||require('../../../config/global').page_num;

  //页面数据
  let common_data = {
    dataName:dataName,//当前激活页
    ...res.user_session,//cookie每次需要校验
    page_header:dataName + '修改',//标题
    _id,start,q,rule,count
  };
  
  mgd({
    collection:dataName
  },(collection,client,ObjectId)=>{
    collection.find({
      _id:ObjectId(_id)
    }).toArray((err,result)=>{
      if(!err){
        res.data={
          ...common_data,
          page_data:result[0]
        }
        res.render('./user/check.ejs', res.data);
      }else{
        res.redirect('/admin/error?error=1&msg='+dataName+'集合链接有误');
      }
      client.close();
    })
  })

});



router.post('/submit',(req,res,next)=>{
  let {username,password,nikename,follow,fans,dataName,icon_old,_id,start,q,count,rule} = req.body;//拆除body数据

  //multer拆出上传图片,需要解决没有修改过的头像
  console.log('1........',req.files)
  let icon = req.files.length ? uploadUrl + req.files[0].filename + pathLib.parse(req.files[0].originalname).ext : '';
  if(icon){
    fs.renameSync(
      req.files[0].path,
      req.files[0].path + pathLib.parse(req.files[0].originalname).ext
    )
  }else{
    icon = icon_old//没有修改过用之前的
  }


  mgd(
    {
      collection:dataName
    },
    (collection,client,ObjectId)=>{
      //updateOne({条件},{更新后},(err,res)=>{})
      collection.updateOne(
        {_id:ObjectId(_id)},
        {$set:{username,password,nikename,follow,fans,icon}},
        (err,result)=>{
          if(!err && result.result.n){
            res.send('/admin/user?dataName='+dataName+'&start='+start+'&q='+q+'&rule='+rule+'&count='+count)
          }else{
            res.send('/admin/error?error=1&msg='+dataName+'集合链接有误')
          }
          client.close();
        }
      )
    }
  );
  
})
module.exports=router;
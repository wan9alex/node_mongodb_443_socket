var express = require('express');
var router = express.Router();
var fs = require('fs');
const pathLib=require('path');
let uploadUrl='/upload/';//上传路径
let mgd = require('../../../common/mgd');

router.get('/',function(req, res, next) {
  let dataName=req.query.dataName;

  //页面数据
  let common_data = {
    dataName:dataName,//当前激活页
    ...res.user_session,//cookie每次需要校验
    page_header:dataName + '添加',//标题
    start:1,
    q:'',
    rule:''
  };

  res.render('./product/add.ejs', common_data);
});

router.post('/submit',(req,res,next)=>{
  // console.log('1111111111',req.body);
  // console.log('2222222222',req.files);
  // res.send();
  let {title,des,auth,content,dataName} = req.body;//拆除body数据
  let time=Date.now();//创建服务器上传时间

  //multer拆出上传图片,需要解决没有上传头像
  let auth_icon = req.files.length ? uploadUrl + req.files[0].filename + pathLib.parse(req.files[0].originalname).ext : '';
  console.log(title,des,auth,content,auth_icon);
  if(auth_icon){
    fs.renameSync(
      req.files[0].path,
      req.files[0].path+pathLib.parse(req.files[0].originalname).ext
    )
  }else{
    auth_icon = '/admin/fileinput/images/noimage.png';
  }

  mgd(
    {
      dbName:'newsapp',
      collection:dataName
    },
    (collection,client)=>{
      collection.insertOne(
        {title,des,detail:{auth,content,auth_icon,time}}
        ,
        (err,result)=>{
          if(!err && result.result.n){
            res.send('/admin/product?dataName='+dataName+'&start=1')
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
var express = require('express');
var router = express.Router();
var mgd = require('../../common/mgd')
var uploadUrl = require('../../config/global').upload.user;
var pathLib = require('path');
var fs = require('fs');


router.post('/',(req,res,next)=>{
  console.log('2222222222',req.files);
  let {username,password,nikename} = req.body;//拆除body数据
  if(!username || !password || !nikename){
    res.send({error:1,msg:'用户名密码昵称为必传参数'})
    return;
  }
  let time=Date.now();//创建服务器上传时间

  //multer拆出上传图片,需要解决没有上传头像
  let icon = req.files.length ? uploadUrl + req.files[0].filename + pathLib.parse(req.files[0].originalname).ext : '';
  // console.log(icon);
  if(icon){
    fs.renameSync(
      req.files[0].path,
      req.files[0].path+pathLib.parse(req.files[0].originalname).ext
    )
  }else{
    icon = '/upload/user/noimage.png';
  }

  mgd(
    {
      collection:'user'
    },
    (collection,client)=>{
      collection.find({username}).toArray((err,result)=>{
        if(!err && result.length>0){
          res.send({error:1,msg:'用户名已存在'})
        }else{
          collection.insertOne(
            {username,password,follow:0,fans:0,nikename,icon,time}
            ,
            (err,result)=>{
              // console.log('...........',result.ops[0]); 插入后的数据
              if(!err && result.result.n){

                res.send({error:0,msg:'注册成功',data:result.ops[0]})
              }else{
                res.send({error:1,msg:'库操作失败'})
              }
              client.close();
            }
          )
        }
      })
      
    }
  );
  
})

module.exports=router;
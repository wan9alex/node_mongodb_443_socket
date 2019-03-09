var express = require('express');
var router = express.Router();
var mgd = require('../../common/mgd');

router.get('/', function(req, res, next) {
  let username=req.query.username;//取的前端的name
  let password=req.query.password;
  if(!username || !password) {
    res.send({error:1,msg:'用户名和密码为必传参数'})
    return;
  }
  // console.log(1,req.query,username,password)
  mgd({
    dbName:'newsapp',
    collection:'user'
  },(collection,client)=>{
    collection.find({username,password},{_id:0}).toArray((err,result)=>{
      // console.log(2,err,result)
      if(!err){
        // console.log('login userdata',result)
        if(result.length>0){
          //种cookie，保存session
          req.session['username'] = username
          client.close();
          // console.log(3,req.session)
          res.send({error:0,msg:'登录成功',data:result[0]});//跳转
        }else{
          res.send({error:1,msg:'用户名或者密码有误'})
        }
      }else{
        res.send({error:1,msg:'库链接错误'})
      }
    })
  })
      
});


module.exports = router

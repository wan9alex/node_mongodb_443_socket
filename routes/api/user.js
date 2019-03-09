var express = require('express');
var router = express.Router();
var mgd = require('../../common/mgd');

router.get('/', function(req, res, next) {
  if(!req.session['username']){
    res.send({error:1,msg:'未登录或者过期'});
    return;
  }
  let username=req.session.username;//取的前端的name
  mgd({
    collection:'user'
  },(collection,client)=>{
    collection.find({username},{_id:0}).toArray((err,result)=>{
      // console.log(2,err,result)
      if(!err){
        // console.log('login userdata',result)
        if(result.length>0){
          //种cookie，保存session
          client.close();
          // console.log(3,req.session)
          res.send({error:0,msg:'成功',data:result[0]});//跳转
        }else{
          res.send({error:1,msg:'失败'})
        }
      }else{
        res.send({error:1,msg:'库链接错误'})
      }
    })
  })
      
});


module.exports = router

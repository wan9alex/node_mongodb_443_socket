var express = require('express');
var router = express.Router();
var mgd = require('../../common/mgd');

router.get('/', function(req, res, next) {
  res.render('reg', { title: 'Express' });
});
router.post('/submit', function(req, res, next) {
  let username=req.body.username;//取的前端的name
  let password=req.body.password;
  console.log(1,req.body,username,password)
  mgd({
    collection:'admin'
  },(collection,client)=>{
    collection.find({username},{_id:0}).toArray((err,result)=>{
      if(!err){
        if(result.length>0){
          res.redirect('/admin/error?error=1&msg=用户名已存在');//跳转到错误页面，会开启静态托管指向的admin虚拟路径
        }else{
          //添加
          collection.insertOne({username,password},(err,result)=>{
            console.log(3,result)
            if(!err && result.result.n){
              res.redirect('/admin/success?error=0&msg=注册成功');
            }else{
              res.redirect('/admin/error?error=1&msg=admin集合链接有误');
            }
            client.close();
          })
        }
      }else{
        res.redirect('/admin/error?error=1&msg=admin集合链接有误');
      }
    })
  })
      
});

module.exports = router;

var express = require('express');
var router = express.Router();
var mgd = require('../../common/mgd');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.post('/submit', function(req, res, next) {
  let username=req.body.username;//取的前端的name
  let password=req.body.password;
  // console.log(1,req.body,username,password)
  mgd({
    dbName:'newsapp',
    collection:'admin'
  },(collection,client)=>{
    collection.find({username,password},{_id:0}).toArray((err,result)=>{
      // console.log(2,err,result)
      if(!err){
        console.log('login userdata',result)
        if(result.length>0){
          //种cookie，保存session
          req.session['username'] = username;
          req.session['icon'] = result[0].icon;
          client.close();
          // console.log(3,req.session)
          res.redirect('/admin/home');//跳转
        }else{
          res.redirect(`/admin/error?error=1&msg=查不到这个用户`);//跳转到错误页面，会开启静态托管指向的admin虚拟路径
        }
      }else{
        res.redirect('/admin/error?error=1&msg=admin集合链接有误');
      }
    })
  })
      
});


module.exports = router

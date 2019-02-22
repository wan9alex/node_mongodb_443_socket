var express = require('express');
var router = express.Router();
var mgd = require('../../common/mgd');
/* GET home page. */
router.get('/', function(req, res, next) {

  let dataName = req.query.dataName||'home';
  let start = req.query.start-1||0;//后端默认 start=0/count=3
  let count = req.query.count-0||3;
  let common_data = {
    active:dataName,
    ...res.user_session,
    page_header:dataName,
  };
  mgd(
    {
      dbName:'newsapp',
      collection:dataName
    },
    (collection,client)=>{

      collection.find({},{
        limit:count,
        skip:start*count,
        projection:{
          _id:1,title:1,des:1
        }
      }).toArray((err,result)=>{
        res.data={
          ...common_data,
          page_data:result,
        };
        next();
        /* res.render('product', {
          ...common_data,
          page_data:result,
        });
        client.close(); */
      })
    }
  );
});

router.get('/', function(req, res, next) {

  let dataName = req.query.dataName||'home';

  mgd(
    {
      dbName:'newsapp',
      collection:dataName
    },
    (collection,client)=>{

      //获取表的长度
      collection.count((err,num)=>{
        console.log('count........',err,num)
        console.log('count........',res.data)
        res.data={
          ...res.data,
          page_count:num,
        }
        console.log('count......',res.data)
       
        res.render('product', res.data);
        client.close();
        
      })
      /* collection.find({}).toArray((err,result)=>{
        res.render('product', {
          ...res.data,
          page_count:result.length,
        });
        client.close();
      }) */
    }
  );
});

/*router.get('/follow', function(req, res, next) {
  console.log('follow.........')
  res.render('product', {
    active:'product/follow',
    username:req.session.username,
    icon:req.session.icon,
    page_header:'关注'
  });
});

router.get('/column', function(req, res, next) {
  console.log('column.........')
  res.render('product', {
    active:'product/collumn',
    username:req.session.username,
    icon:req.session.icon,
    page_header:'栏目'
  });
});*/

router.use('/add', require('./product/add'));//use 指向中间件|路由|函数  get，post, all指向函数
router.use('/del', require('./product/del'));
router.use('/check',  require('./product/check'));
router.use('/search', require('./product/search'));
router.use('/sort', require('./product/sort'));



module.exports = router;

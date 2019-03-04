var express = require('express');
var router = express.Router();
var mgd = require('../../common/mgd');
/* GET home page. */
router.get('/', function(req, res, next) {

  let dataName = req.query.dataName||'home';
  
  let start = req.query.start ? req.query.start-1 : require('../../config/global').page_start-1;//后端默认 start=0/count=3
  let count = req.query.count ? req.query.count-0 : require('../../config/global').page_num;
  let q = req.query.q||'';
  let rule = req.query.rule||'';

  //页面数据
  let common_data = {
    dataName:dataName,//当前激活页
    ...res.user_session,//cookie每次需要校验
    page_header:dataName,//标题
    start:start+1,
    q:q,
    rule:rule,
    count:count,
    api_name:'product'
  };
  mgd(
    {
      collection:dataName
    },
    (collection,client)=>{

      collection.find(
        q ? {title: eval('/'+ q +'/g') } : {},{
        // limit:count,
        // skip:start*count,
        projection:{
          _id:1,title:1,des:1
        },
        sort:rule ? {[rule]:-1} : {'detail.time':-1}
      }).toArray((err,result)=>{
        let checkResult=result.slice(start*count,start*count+count)//提取要分页的数据
        res.data={
          ...common_data,
          page_data:checkResult,
          page_count:Math.ceil(result.length/count)//计算总页数
        }
        res.render('product', res.data);
        client.close();
      })
    }
  );
});
/* 
router.get('/', function(req, res, next) {

  let dataName = req.query.dataName||'home';
  let count = req.query.count ? req.query.count-0 : require('../../common/global').page_num;

  mgd(
    {
      dbName:'newsapp',
      collection:dataName
    },
    (collection,client)=>{

      //获取表的长度
      collection.countDocuments((err,num)=>{
        // console.log('count........',err,num)
        // console.log('count........',res.data)
        res.data={
          ...res.data,
          page_count:Math.ceil(num/count)//计算总页数
        }
        // console.log('count......',res.data)
       
        res.render('product', res.data);
        client.close();
      })
    }
  );
}); */

/*router.get('/follow', function(req, res, next) {
  console.log('follow.........')
  res.render('product', {
    dataName:'product/follow',
    username:req.session.username,
    icon:req.session.icon,
    page_header:'关注'
  });
});

router.get('/column', function(req, res, next) {
  console.log('column.........')
  res.render('product', {
    dataName:'product/collumn',
    username:req.session.username,
    icon:req.session.icon,
    page_header:'栏目'
  });
});*/

router.use('/add', require('./product/add'));//use 指向中间件|路由|函数  get，post, all指向函数
router.use('/del', require('./product/del'));
router.use('/check',  require('./product/check'));
// router.use('/search', require('./product/search'));
// router.use('/sort', require('./product/sort'));



module.exports = router;

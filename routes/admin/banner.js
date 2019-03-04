var express = require('express');
var router = express.Router();
var mgd = require('../../common/mgd');
/* GET home page. */
router.get('/', function(req, res, next) {

  let dataName = req.query.dataName;
  
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
    api_name:'banner'
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
        res.render('banner', res.data);
        client.close();
      })
    }
  );
});

router.use('/add', require('./banner/add'));//use 指向中间件|路由|函数  get，post, all指向函数
router.use('/del', require('./banner/del'));
router.use('/check',  require('./banner/check'));

module.exports = router;
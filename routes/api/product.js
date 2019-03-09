var express = require('express');
var router = express.Router();
var mgd = require('../../common/mgd');

router.get('/', function(req, res, next) {

  //参数整理
  let dataName = req.query.dataName
  if(!dataName) {
    res.send({error:1,msg:'dataName为必传参数'});
    return;
  }
  
  let start = req.query.start ? req.query.start-1 : require('../../config/global').page_start-1;//后端默认 start=0/count=3
  let count = req.query.count ? req.query.count-0 : require('../../config/global').page_num;
  let q = req.query.q||require('../../config/global').q;
  let rule = req.query.rule||require('../../config/global').rule;

  mgd(
    {
      collection:dataName
    },
    (collection,client)=>{

      collection.find(
        q ? {title: eval('/'+ q +'/g') } : {},{
        sort:rule ? {[rule]:-1} : {'detail.time':-1},
        projection:{
          _id:1,title:1,des:1
        }
      }).toArray((err,result)=>{
        let checkResult=result.slice(start*count,start*count+count)//提取要分页的数据
        res.data={
          error:0,
          msg:'成功',
          count:Math.ceil(result.length/count),//计算总页数
          total:result.length,
          result:checkResult
        }
        res.send(res.data);
        client.close();
      })
    }
  );
});


module.exports = router;

var express = require('express');
var router = express.Router();
var mgd = require('../../common/mgd');
router.get('/', function(req, res, next) {

  let dataName = req.query.dataName;
  if(!dataName){
    res.send({error:1,msg:'dataName为必传参数'})
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
        projection:{
          _id:1,title:1,sub_title:1,banner:1
        },
        sort:rule ? {[rule]:-1} : {'detail.time':-1}
      }).toArray((err,result)=>{
        let checkResult=result.slice(start*count,start*count+count)//提取要分页的数据
        res.data={
          error:1,
          msg:'成功',
          total:result.length,
          count:Math.ceil(result.length/count),//计算总页数
          data:checkResult
        }
        res.send(res.data);
        client.close();
      })
    }
  );
});


module.exports = router;

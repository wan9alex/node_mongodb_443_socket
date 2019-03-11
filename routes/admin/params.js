module.exports=(req,res,next)=>{
  console.log('params...............',req.body);

  let start = req.query.start ? req.query.start-1 : require('../../config/global').page_start-1;//后端默认 start=0/count=3
  let count = req.query.count ? req.query.count-0 : require('../../config/global').page_num;
  let q = req.query.q||require('../../config/global').q;
  let rule = req.query.rule||require('../../config/global').rule;
  let _id = req.query._id;
  let page_header=req.query.dataName;
  let dataName=req.query.dataName;
  res.params={start,count,q,rule,page_header,dataName,_id}
  next()
};

module.exports=(req,res,next)=>{
  // console.log('islogin............................')
  if(!req.session['username']){
    res.redirect('/admin/login')
  }else{
    next();//交给app.use后续响应处理
  }
};

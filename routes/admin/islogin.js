module.exports=(req,res,next)=>{
  // console.log('islogin............................')
  if(!req.session['username']){
    res.redirect('/admin/login')
  }else{
    res.user_session={username:req.session.username,icon:req.session.icon}
    next();//交给app.use后续响应处理
  }
};

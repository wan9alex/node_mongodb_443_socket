module.exports=(req,res,next)=>{
  console.log('islogin............................')
  // res.render('home', { title: 'Express' });
  if(Math.random()<.5){
    res.redirect('/admin/login')
  }else{
    next();//交给app.use后续响应处理
  }
};

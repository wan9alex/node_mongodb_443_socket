module.exports=(io)=>{

  io.on('connection',(socket)=>{
    //socket请求
    require('./movie')(socket,io)
    require('./bbs')(socket,io)
  
  });

}
module.exports=(socket,io)=>{


    //小编请求
    socket.on('add_movie',(data)=>{ //data=小编携带的数据
      console.log('服务监听',data);
      
      //兜库 把data存到库
  
      //广播给所有用户端
      io.emit('new_movie',{movie:{a:'数据890'}})//推送
    })
  

}
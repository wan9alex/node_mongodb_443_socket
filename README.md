# node_mongodb_443_socket
node&amp;&amp;mongodb&amp;&amp;newsapp&amp;&amp;443&amp;&amp;socket

测试阿里云服务器

git clone 地址
npm i
修改: config/index.js 
  local:{
    open:true,
    port:3000
  },
  https:{
    open:false,
    port:443
  }
修改: public/javascrpts/port.js
  var port = socket_local_port;
npm run dev
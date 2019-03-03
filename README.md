
##测试阿里云服务器

# 1. git clone 地址
# 2. npm i
# 3. 修改: config/index.js 
  > local:{
  >   open:true,
  >   port:3000
  > },
  > https:{
  >   open:false,
  >   port:443
  > }
# 4. 修改: public/javascrpts/port.js
# 5. var port = socket_local_port;
# 6. npm run dev
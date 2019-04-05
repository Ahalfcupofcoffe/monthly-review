//app.js

//引入
let netUtil = require('utils/netUtil.js');

App({
  onLaunch: function () {
    
  },
  //保存常用全局变量
  globalData: {
    
  },
  //保存常用全局函数
  globalFunc: {
    req: netUtil.dataRequest
  }
})
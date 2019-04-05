//index.js
//引入
let urls = require('../../utils/urls.js');
//获取应用实例
const app = getApp()

Page({
  data: {
    shadowList: []
  },
  //事件处理函数
  
  onLoad: function (options) {
    let that = this;
    let shadowUrlObj = urls.thermalFilmUrl;
    let params = {
      count: 15
    }

    //影片数据请求
    for (let attr in shadowUrlObj){
      app.globalFunc.req({
        url: shadowUrlObj[attr],
        params,
        method: 'GET',
        onStart: that.onStart,
        onSuccess: that.onSuccess,
        onFailed: that.onFailed
      });
    }
  },

  //onStart回调
  onStart: function () {
    wx.showLoading({
      title: '正在加载'
    })
  
  },
  //onSuccess回调
  onSuccess: function (res) {
    wx.hideLoading();
    let filmItems = res;
    let shadowList = this.data.shadowList;
    shadowList.push(filmItems);
    this.setData({
      shadowList
    })
  },
  //onFailed回调
  onFailed: function(msg){
    wx.hideLoading();
    if(msg){
      wx.showLoading({
        title: msg
      })
    }
  }
})

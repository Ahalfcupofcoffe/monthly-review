// pages/search/search.js

//引入
let urls = require('../../utils/urls.js');
//获取应用实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let searchUrl = urls.searchUrl;
    this.setData({
      searchUrl
    });
  },
  searchEvent(e){
    let queryText = e.detail.value; 
    let url = this.data.searchUrl;
    if (queryText === ''){
      this.setData({
        searchRes: {}
      });
    }else{
      app.globalFunc.req({
        url,
        params: {
          q: queryText,
          count: 20
        },
        method: 'GET',
        isPromise: true,
        onFailed: this.onFailed
      }).then(res => {
        console.log(res);
        this.setData({
          searchRes: res.subjects
        });
      })
    }
  },
  //onStart回调
  onStart: function () {
    wx.showLoading({
      title: '正在加载'
    })
  },
  //onFailed回调
  onFailed: function (msg) {
    wx.hideLoading();
    if (msg) {
      wx.showLoading({
        title: msg
      })
    }
  }
})
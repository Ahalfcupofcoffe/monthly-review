// pages/list/list.js

//引入
let urls = require('../../utils/urls.js');
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let filmType = options.type;
    let shadowUrlObj = urls.thermalFilmUrl;
    let shadowUrl = null;
    let params = {
      count: 24
    }
    //保存影片类型
    that.setData({
      filmType: filmType
    });
    //导航标题设置
    wx.setNavigationBarTitle({
      title: options.film
    })
    //根据影片类型改变请求地址
    if (filmType === 'movie_showing'){
      shadowUrl = shadowUrlObj.movieUrl;
    } else if (filmType === 'tv_variety_show'){
      shadowUrl = shadowUrlObj.varietyUrl;
    } else if (filmType === 'tv_hot'){
      shadowUrl = shadowUrlObj.tvUrl;
    } else if (filmType === 'book_fiction') {
      shadowUrl = shadowUrlObj.bookUrl;
    } else if (filmType === 'music_japan_korea') {
      shadowUrl = shadowUrlObj.musicJapanUrl;
    } else{
      console.log(filmType);
    }
    //影片数据请求
    app.globalFunc.req({
      url: shadowUrl,
      params,
      method: 'GET',
      onStart: that.onStart,
      onSuccess: that.onSuccess,
      onFailed: that.onFailed
    });
  },

  //onStart回调
  onStart: function () {
    wx.showLoading({
      title: '正在加载'
    })

  },
  //onSuccess回调
  onSuccess: function (res) {
    let filmItems = res.subject_collection_items;
    wx.hideLoading();
    this.setData({
      filmList: filmItems
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
// pages/comments/comments.js

//引入
let int = require("../../utils/intermediator.js");
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shortComments: [],
    start: 1,
    count: 20,
    page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let total = int.data.total;
    let count = this.data.count;
    //最后一页
    let lastPage = parseInt(total / count);
    //最后一页该请求多少条数据
    let tailData = total % count;
    this.setData({
      lastPage,
      tailData
    });
    //调用
    this.commentsRequest();
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let lastPage = this.data.lastPage;
    let tailData = this.data.tailData;
    let page = this.data.page;
    //评论处理
    if(lastPage > page){
      let start = this.data.start;
      start += 20;
      page += 1;
      this.setData({
        start,
        page
      });
      this.commentsRequest();
    }else if(lastPage === page){
      page += 1;
      this.setData({
        count: tailData,
        page
      });
      this.commentsRequest();
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
  },
  commentsRequest: function (){
    let that = this;
    //短评数据请求
    app.globalFunc.req({
      url: int.data.shortComment,
      params: {
        start: that.data.start,
        count: that.data.count
      },
      method: 'GET',
      isPromise: true,
      onStart: that.onStart,
      onFailed: that.onFailed
    }).then(res => {
      if (res.comments === undefined) {
        res.comments = res.interests;
        res.interests = null;
      }
      let data = that.data.shortComments;
      //发布评论日期处理
      int.func.commentData(res);
      for (let i = 0, len = res.comments.length; i<len; i++){
        data.push(res.comments[i]);
      }
      that.setData({
        shortComments: data,
        totals: int.data.total
      });
    })
  }
})
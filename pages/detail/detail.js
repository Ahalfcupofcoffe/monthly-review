// pages/detail/detail.js

//引入
let urls = require('../../utils/urls.js');
let int = require("../../utils/intermediator.js");
//获取应用实例
const app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    isFolded: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let filmType = options.filmType || options.type;
    let filmId = options.id;
    let filmDetailedUrlObj = urls.filmDetailsUrl;
    let shortCommentObj = filmDetailedUrlObj.shortCommentUrl(filmId);
    let shortComment = null;
    let filmDetailedUrl = null;
    let isChange = {};

    //subtype 电影
    //根据类型改变请求地址
    if (filmType === 'book_fiction' || filmType === 'book') {
      filmDetailedUrl = filmDetailedUrlObj.bookDetailUrl + filmId;
      isChange.type = 'book';
      isChange.btnText = ['想读', '在读', '读过'];
      isChange.cls = ''
      shortComment = shortCommentObj.book;
    } else if (filmType === 'music_japan_korea' || filmType === 'music') {
      filmDetailedUrl = filmDetailedUrlObj.musicDetailUrl + filmId;
      isChange.type = 'music';
      isChange.btnText = ['想听', '在听', '听过'];
      shortComment = shortCommentObj.music;
    } else if (filmType === 'game'){
      filmDetailedUrl = (filmDetailedUrlObj.musicDetailUrl) + filmId;
      isChange.type = 'game';
      isChange.btnText = ['想玩', '在玩', '玩过'];
      shortComment = shortCommentObj.game;
    } else {
      filmDetailedUrl = (filmDetailedUrlObj.filmDetailUrl) + filmId;
      isChange.type = 'film';
      isChange.btnText = ['想看', '在看', '看过'];
      shortComment = shortCommentObj.film;
    }
    //保存短评路径
    int.data.shortComment = shortComment;
    //类型更新
    that.setData({
      isChange
    });

    //影片、书、音乐数据请求
    app.globalFunc.req({
      url: filmDetailedUrl,
      params: {},
      method: 'GET',
      isPromise: true,
      onStart: that.onStart,
      onFailed: that.onFailed
    }).then(res => {
      let that = this;
      let type = that.data.isChange.type;
      //导航标题设置
      wx.setNavigationBarTitle({
        title: res.title
      })
      //根据类型渲染处理
      that.typeProcessing(res, type);
      //更新数据
      that.setData({
        detailData: res
      })
      //折叠是否隐藏
      that.isShow();
      //短评数据请求
      app.globalFunc.req({
        url: shortComment,
        params: {
          count: 4
        },
        method: 'GET',
        isPromise: true,
        onStart: that.onStart,
        onFailed: that.onFailed
      }).then(res => {
        if (res.comments === undefined){
          res.comments = res.interests;
          res.interests = null;
        }
        //保存评论数
        int.data.total = res.total;
        //评论数据处理
        int.func.commentData(res);
        this.setData({
          shortComments: res.comments,
          totals: res.total
        });
      })
    })

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
  //简介是否折叠
  change: function (e) {
    this.setData({
      isFolded: !this.data.isFolded,
    })
  },
  //根据类型渲染处理
  typeProcessing: function(res, type){
    if (type === 'film') {
      //影片数据渲染处理
      res.genres = res.genres.join(' ');
      res.pubdates = res.pubdates[0].split('(')[0];
      res.year = '('+res.year+')';
      //影人数据渲染处理
      let filmmakerMsg = [];
      let directors = res.directors;
      let casts = res.casts;
      for (let i = 0, len = directors.length; i < len; i++) {
        directors[i].duty = '导演';
      }
      for (let i = 0, len = casts.length; i < len; i++) {
        casts[i].duty = '演员';
      }
      filmmakerMsg = directors.concat(casts);
      res.filmmakerMsg = filmmakerMsg;
    } else if (type === 'music') {
      res.songMsg = res.extra.info.join().split(',');
      if (res.desc !== '') {
        res.desc = res.desc.split('>')[1].split('<')[0];
      }
    } else if (type === 'book') { } 
  },
  //简介的折叠是否隐藏
  isShow: function () {
    let isShow = true;
    this.createSelectorQuery().select('#summary').fields({
      size: true
    },(res) => {
      if(res === null || res.height <= 95){
        isShow = false;
      }
      this.setData({
        isShow
      });
    }).exec();
  },
  onbuttonEvent(e){
    let name = e.currentTarget.dataset.name;
    //name用来判断点的是哪个
    wx.navigateTo({
      url: '/pages/evaluate/evaluate?name='+name,
    })
    console.log(name);
  }
})
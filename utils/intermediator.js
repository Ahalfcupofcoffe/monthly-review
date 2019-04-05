//专门用来无法常规传值，通过保存在这里，然后导出，哪里需要就引入
//保存不太常用的标签和函数
//变量
let intermediatorData = {};
//函数
let intermediatorFunc = {
  //发布评论日期处理
  timeHandle: (timeArr) => {
    let nowMillisecondTime = new Date().getTime();
    let releaseTime;
    let month;
    let day;
    let millisecondTime;
    let millisecondDifference;
    let branch;
    let time = [];
    for (let i = 0, len = timeArr.length; i < len; i++) {
      releaseTime = new Date(timeArr[i]);
      month = releaseTime.getMonth() + 1;
      day = releaseTime.getDate();
      millisecondTime = releaseTime.getTime();
      millisecondDifference = nowMillisecondTime - millisecondTime;
      branch = (millisecondDifference / 1000) / 60;
      if (branch < 1) {
        time.push('1分钟前');
      } else if (branch < 30) {
        time.push('30分钟前');
      } else if (branch < 60) {
        time.push('1个小时前');
      } else if (branch < 720) {
        time.push('12个小时前');
      } else if (branch < 1440) {
        time.push('1天前');
      } else if (branch < 2880) {
        time.push('2天前');
      } else if (branch < 4320) {
        time.push('3天前');
      } else {
        time.push(month + '月' + day + '日');
      }
    }
    return time;
  },
  //评论数据处理
  commentData: function (res){
    //关闭加载
    wx.hideLoading();
    let len = res.comments.length;
    let timeArr = [];
    for (let i = 0; i < len; i++) {
      timeArr.push(res.comments[i].create_time ? res.comments[i].create_time : res.comments[i].created_at);
    }
    let time = this.timeHandle(timeArr);
    for (let i = 0; i < len; i++) {
      res.comments[i].create_time = time[i];
    }
  }
};

exports.data = intermediatorData;
exports.func = intermediatorFunc;

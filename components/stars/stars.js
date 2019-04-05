// components/stars/stars.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    score: {
      type: Number,
      value: 0,
      observer(newVal, oldVal, changedPath) {
        this.updateStars();
      }
    },
    starSize: {
      type: Number,
      value: 22 //rpx
    },
    scoreFontSize: {
      type: Number,
      value: 20 //rpx
    },
    scoreFontColor: {
      type: String,
      value: '#818181'
    },
    starScoreAlign: {
      type: String,
      value: 'left'
    },
    isText: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    updateStars: function(){
      let that = this;
      let score = that.data.score;
      //暂时评分超出，不足处理
      if (score > 10 || score < 0) {
        score = 0
      }
      let intScore = parseInt(score);
      let whole = parseInt(intScore / 2);
      let half = intScore % 2;
      let empty = 5 - whole - half;
      let wholesArr = [];
      let halfsArr = [];
      let emptysArr = [];
      for (var index = 0; index < whole; index++) {
        // 高亮星星个数
        wholesArr.push(index);
      }
      for (var index = 0; index < half; index++) {
        //半高亮星星个数
        halfsArr.push(index);
      }
      for (var index = 0; index < empty; index++) {
        // 灰色星星个数
        emptysArr.push(index);
      }
      //评分位数处理
      let scoreText = score && score > 0 ? score.toFixed(1) : "暂未评分";
      //动态更新星星
      that.setData({
        wholesArr: wholesArr,
        halfsArr: halfsArr,
        emptysArr: emptysArr,
        scoreText: scoreText
      })
    }
  },
  // 自定义组件生命周期
  lifetimes: {
    // 在组件实例进入页面节点树时执行
    attached() {
      this.updateStars();
    },
    // 在组件实例被从页面节点树移除时执行
    detached() {
      
    },
  }
})

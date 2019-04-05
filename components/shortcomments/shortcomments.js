// components/shortcomments/shortcomments.js
Component({
  externalClasses: ['iconfont', 'icon-zan'],
  /**
   * 组件的属性列表
   */
  properties: {
    shortComments: {
      type: Array,
      value: []
    },
    commentsTotal: {
      type: Number,
      value: 0
    },
    isCommentsTextChange: {
      type: Object,
      value: {}
    },
    isShowOrHide: {
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
    clickIsShow(e){
      let index = e.currentTarget.dataset.index;
      let is = "isCommentsTextChange."+index;
      this.setData({
        [is]: true
      });
    }
  }
})

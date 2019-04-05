// components/searchbar/searchbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isnavigator: {
      type: Boolean,
      value: false
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
    inputEvent(e){
      let value = (e.detail.value).trim();
      let inputValue = {
        value: value
      }
      //触发
      this.triggerEvent("search", inputValue);
    }
  }
})

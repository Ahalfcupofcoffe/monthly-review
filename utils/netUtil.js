/**
 * function: Promise / 回调
 */
function getRequest(options) {
  if(options.onStart !== undefined){
    options.onStart()  //请求开始
  }
  let task = null;
  if(options.isPromise === true){
    return new Promise((resolve, reject) => {
      task = request(options, resolve);
    })
  }else{
    task = request(options);
  }
  return task;
}

/**
 * function: 网络请求
 * @url: URL地址
 * @params: 请求参数
 * @method: 请求方式
 * @onStart: 开始请求，初始加载loading等处理
 * @onSuccess: 成功回调
 * @onFailed: 失败回调
 */
function request(options, resolve) {
  let task = wx.request({
    url: options.url,
    data: dealParams(options.params),
    method: options.method,
    header: { 'content-type': 'application/xml' },
    success(res) {
      // console.log(res.data);
      if (res.data) {
        /* start 根据需求 接口的返回状态码进行处理 */
        if (res.statusCode == 200) {
          //请求成功
          if (options.isPromise === true) {
            resolve(res.data);
          } else {
            options.onSuccess(res.data);
          }
        } else {
          //请求失败
          options.onFailed(res.data.msg);
        }
        /*end 处理结束*/
      }
    },
    fail(error) {
      onFailed(''); //其它原因请求失败
    }
  })
  return task;
}

/**
 * function: 根据需求处理请求参数: 添加固定参数配置等
 * @params: 请求参数
 */
function dealParams(params) {
  return params;
}

//导出
exports = module.exports = {
  dataRequest: getRequest
};
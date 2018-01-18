var util = require('./utils/util.js');
var md5 = require('./utils/md5.js');
//app.js
App({
  onLaunch: function () {
    //console.log('小程序开始运行')
  },
  onShow:function(){
//    console.log('在此小程序中')
       this.init();
       wx.login({
            success: function (res) {
                 console.log(res)
                 if (res.code) {
                      //发起网络请求
                      wx.request({
                           url: 'https://pre-online.17getfun.com/weixin/miniProgram/getInfo',
                           data: {
                                js_code: res.code
                           },
                           success: function (res) {
                                console.log(res.data.data)
                           }
                      })
                 } else {
                      console.log('获取用户登录态失败！' + res.errMsg)
                 }
            }
       });
  },
  onHide:function(){
   //console.log("不在小程序中")
  },
  onError:function(){
   console.log('有错误:'+msg)
  },
  config:{
    //接口变量
    // host:'https://www.17getfun.com',
    // testhost:'https://backup.17getfun.com',
    //版本
    version: "1.1.0",
    //app名称
    channel: '盖饭好物小程序'
  },
  init:function () {
       var that = this;
       //  获取授权
       this.util.authorize();
  },
  globalData: {
       //设备信息
       systemInfo: null,
       //微信用户信息
       userInfo: wx.getStorageSync('userInfo') || null
  },
  apiList: {
  //接口列表

  },
  loading:function(){
   wx.showLoading({
        title: '加载中...',
        mask:true
   })
  },
  hideloading:function(){
       wx.hideLoading();
  },
  // 提示信息
  alert: function (msg) {
       wx.showModal({
            content: msg,
            showCancel: false,
       });
  },
  showTost: function (title, callback) {
       wx.showToast({
            title: title || '成功',
            icon: 'success',
            duration: 2000,
            success: function (data) {
                 callback && callback(data);
            }
       })
  },
  // showModal: function (title, content, confirmText, callBack)   // showModal 
  showModal: function (title, content, confirmText, callBack) {
       wx.showModal({
            title: title,
            content: content,
            cancelText: '取消',
            cancelColor: '#999',
            confirmText: confirmText || '确认',
            confirmColor: '#4990E2',
            success: function (res) {
                 if (res.confirm) {
                      callBack && callBack(true);
                 } else if (res.cancel) {
                      callBack && callBack(false);
                 }
            }
       })
  },
  util,
  md5
})
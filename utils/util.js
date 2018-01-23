//获取用户信息授权
function authorize() {
     var app = getApp();
     wx.getSetting({
          success(res) {
               if (!res.authSetting['scope.userInfo']) {
                    wx.authorize({
                         scope: 'scope.userInfo',
                         success(data) {
                              getToken();
                              wx.getUserInfo({
                                   success: function (res) {
                                        wx.setStorageSync('userInfo', res.userInfo);
                                        isAuthorization(res.userInfo);
                                   }
                              })
                         }
                    })
               }
          }
     })
}
//  向后台发送 用户信息
function isAuthorization(userInfo) {
     var that = this;
     var app = getApp();
     // app.apiPost(app.apiList.isAuthorization, {
     //      data: JSON.stringify(userInfo)
     // }, function (data) {
     //      if (data.errmsg) {
     //           getToken(function () {
     //                isAuthorization(userInfo);
     //           })
     //      } else if (data.code == 1) {
     //           console.log('授权成功');
     //      } else {
     //           console.log('授权失败');
     //      }
     // })
}
// 获取token
function getToken(callback) {
     var app = getApp();
     wx.login({
          success: function (data) {
               var wxCode = data.code;
               app.apiPost(app.apiList.getToken, {
                    code: wxCode,
                    sc_code: app.md5.hexMD5('527df1d988173f71b6e6d5f2c2cbaf54%sc'),
                    source: 'sc'
               }, function (data) {
                    wx.setStorageSync('token', data.token);
                    callback && callback(data);
               })
          }
     })
}
//获取首页初始数据
function initialcontent(callBack) {
     var app = getApp();
     app.apiGet(app.apiList.initialcontent, function (data) {
          app.globalData.content = data
          // that.setData({
          //      'content': data
          // })
     })
}
module.exports = {
  authorize: authorize,
  getToken: getToken,
  isAuthorization: isAuthorization,
  initialcontent: initialcontent
}

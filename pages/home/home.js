// pages/home/home.js
var app = getApp();
Page({

     /**
      * 页面的初始数据
      */
     data: {
          content:"",
          imgUrls: [
               'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
               'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
               'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
          ],
          indicatorDots: true,
          autoplay: true,
          interval: 2000,
          duration: 800,
          circular: true,
          shdow:false
     },

     /**
      * 生命周期函数--监听页面加载
      */
     onLoad: function () {
          var that = this;
              that.promiseAll();
     },

     /**
      * 生命周期函数--监听页面初次渲染完成
      */
     onReady: function () {

     },

     /**
      * 生命周期函数--监听页面显示
      */
     onShow: function () {

     },
     promiseAll: function () {
          var that = this;
          // app.loading();
          Promise.all(that.initialcontent()).then(function (data) {
               console.log(that.data)
               app.hideloading();
          }).catch(function (err) {
               if (err.errmsg) {
                    app.util.getToken(function () {
                         that.promiseAll();
                    })
               }
          })
     },
     /**
      * 生命周期函数--监听页面隐藏
      */
     onHide: function () {

     },

     /**
      * 生命周期函数--监听页面卸载
      */
     onUnload: function () {

     },

     /**
      * 页面相关事件处理函数--监听用户下拉动作
      */
     onPullDownRefresh: function () {

     },

     /**
      * 页面上拉触底事件的处理函数
      */
     onReachBottom: function () {

     },

     /**
      * 用户点击右上角分享
      */
     onShareAppMessage: function () {

     },
     copy: function (e) {
          var that = this;
          var datalink = e.currentTarget.dataset.link;
          wx.setClipboardData({
               data: datalink,
               success: function (res) {
                    wx.getClipboardData({
                         success: function (res) {
                              wx.showModal({
                                   title: '提示',
                                   content: '复制成功，打开手机淘宝下单即可。',
                                   confirmText: '我知道了',
                                   confirmColor: '#FF44AA',
                                   cancelText: '查看教程',
                                   cancelColor: '#666666',
                                   success: function (res) {
                                        if (res.confirm) {
                                             console.log('用户点击确定')
                                        } else if (res.cancel) {
                                             console.log('用户点击取消')
                                        }
                                   }
                              })
                         }
                    })
               }
          })
     },
     redenvelopes: function () {
          var that = this;
          if (app.globalData.follow != undefined) {
               that.setData({
                    'shdow': true
               })
          } else {
               wx.showModal({
                    title: '提示',
                    content: '关注公众号“盖饭好物”后即可领取红包。',
                    confirmText: '现在关注',
                    confirmColor: '#FF44AA',
                    cancelText: '关注',
                    cancelColor: '#666666',
                    success: function (res) {
                         if (res.confirm) {
                              console.log('用户点击确定')
                         } else if (res.cancel) {
                              console.log('用户点击取消')
                         }
                    }
               })
          }
     },
     //初始内容
     initialcontent:function(){
          return new Promise((resolve, reject) => {
               var that = this;
               app.util.initialcontent(function (data) {
                    if (data.errmsg) {
                         reject(data);
                    } else {
                         resolve(data);
                    }
               })
          })
     }
})
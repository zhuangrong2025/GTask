//index.js
//获取应用实例
const app = getApp()
const header = app.globalData.header;
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  // log
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // add baby
  bindAddBody: function () {
    wx.navigateTo({
      url: '../baby/baby'
    })
  },
  onLoad: function () {
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })

    // 获取code，并请求服务端的openid
    wx.login({
      success: res => {
        var code = res.code
        if (code) {
          wx.request({
            url: 'http://localhost:8081/login',
            method: "post",
            data: { code: code, nickname: this.data.userInfo.nickName },
            success(res) {
              console.log("获取到openid：" + res.data.openid)
              wx.setStorageSync("sessionId", res.data.openid)
            }
          })

        } else {
          console.log('获取用户登录态失败：' + res.errMsg);
        }
      }
    })
  }
})

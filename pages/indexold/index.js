//index.js
//获取应用实例
const app = getApp()
const header = app.globalData.header;
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    accounts: [{}]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 服务器账户获取列表
  bindGetList: function () {
    
    // 获取Storage中的sessionId
    

    wx.request({
      url: 'http://localhost:8081/list',    
      header: header,   
      success: res => {        
        this.setData({
          accounts: res.data
        })
      }
    })
  },
  //事件处理函数
  bindShowList: function () {
    wx.navigateTo({
      url: '../account/lists/list'
    })
  },
  // 微信登录
  bindToLogin: function () {
    // 获取code
    wx.login({
      success: res => {
        var code = res.code     
        if (code) {
          wx.request({
            url: 'http://localhost:8081/login',
            method: "post",
            data: { code: code, nickname: this.data.userInfo.nickName},
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
    console.log("获取用户信息！")
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})

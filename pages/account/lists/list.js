//list.js


Page({
  data: {
    accounts: [{}]
  },
  onLoad: function () {
    // 请求账户列表
    var _this = this
    wx.request({
      url: 'http://localhost:8081/list', 
      header: {
        'content-type': 'application/json; charset=utf-8',
        'cookie': wx.getStorageSync("sessionId")
      },
      success(res) {
        _this.setData({
          accounts: res.data
        })
      }
    })
  }
})

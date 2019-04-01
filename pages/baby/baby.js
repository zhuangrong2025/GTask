//index.js
const app = getApp()
Page({
  data: {
    gender: [
      {value: 'boy', checked: true },
      {value: 'girl' }
    ],
    seleted: "boy",
    nickname: "",
    date: "2016-09-01",
    sessionid: wx.getStorageSync("sessionId")
  },
  // gender
  radioChange: function (e) {
    let value = e.detail.value;
    this.setData({
      seleted: value
    })
  },
  // nickname
  bindGetNickname(e) {
    this.setData({
      nickname: e.detail.value
    })
  },
  // date
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  // save
  bindSavebaby() {
    wx.request({
      url: 'http://localhost:8081/baby/add',
      method: "post",
      data: { code: code, nickname: this.data.userInfo.nickName },
      success(res) {
        console.log("获取到openid：" + res.data.openid)
        wx.setStorageSync("sessionId", res.data.openid)
      }
    })
    // console.log("gender：" + this.data.seleted + " &nickname：" + this.data.nickname + " &date：" + this.data.date + " &sessionid：" + this.data.sessionid)
  },
  onLoad: function () {

  },

})

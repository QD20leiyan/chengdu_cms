//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
    onLaunch: function () {
      wx.showShareMenu({
        //这里是为了分享群可以获取群信息，比如shareTickets
        withShareTicket: true
      }),
      wx.updateShareMenu({
        withShareTicket: true,
        success() {
        }
      })
    }
})
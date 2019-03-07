// pages/detail/detail.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    wards: {
      ward_info: [
        {
          info: '新赛季荣耀奖励',
          sub_info: '200W强化点（限量）'
        },
        {
          info: '【传奇】',
          sub_info: '100钻石'
        },
        {
          info: '【大师】',
          sub_info: '顶级碎片礼包：暗影恶魔碎片*2、死亡骑士碎片*2'
        },
        {
          info: '【钻石】',
          sub_info: '黑暗骑士碎片：黄金战斧（15天）、黑暗骑士碎片*1'
        },
        {
          info: '【白金】',
          sub_info: '冲段突击套装：血蟒AN94（3天）、20钻石'
        },
        {
          info: '【黄金】',
          sub_info: '觉醒组合卡：炎龙觉醒卡*1、暴烈骑士觉醒卡*1'
        },
        {
          info: '【白银】',
          sub_info: 'PVE套装：挑战复活币3个、G36碎片1个、200荣誉'
        },
        {
          info: '【青铜】',
          sub_info: '开运5钻石：5钻石'
        }
      ]
    }
  },
  onLoad:function(){
    wx.hideShareMenu();
  },
  navigator: function (e) {
    if (e.currentTarget.dataset.url != this.route) {
      // 返回上一页
      wx.navigateBack({delta: 1});
    }
  }
})
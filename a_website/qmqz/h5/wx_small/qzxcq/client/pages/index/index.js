//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')


Page({
  data: {
    swiper:{
      slides: [
        {
          imgurl: 'https://cdnstatic.yingxiong.com/qmqz/h5/wx_small/images/gift8.png',
          text:'新赛季荣誉奖励'
        },
        {
          imgurl: 'https://cdnstatic.yingxiong.com/qmqz/h5/wx_small/images/gift1.png',
          text: '100钻石'
        },
        {
          imgurl: 'https://cdnstatic.yingxiong.com/qmqz/h5/wx_small/images/gift2.png',
          text: '顶级碎片礼包'
        },
        {
          imgurl: 'https://cdnstatic.yingxiong.com/qmqz/h5/wx_small/images/gift3.png',
          text: '黑暗骑士碎片'
        },
        {
          imgurl: 'https://cdnstatic.yingxiong.com/qmqz/h5/wx_small/images/gift4.png',
          text: '冲段突击套装'
        },
        {
          imgurl: 'https://cdnstatic.yingxiong.com/qmqz/h5/wx_small/images/gift5.png',
          text: '觉醒组合卡'
        },
        {
          imgurl: 'https://cdnstatic.yingxiong.com/qmqz/h5/wx_small/images/gift6.png',
          text: '开运5钻石'
        },
        {
          imgurl: 'https://cdnstatic.yingxiong.com/qmqz/h5/wx_small/images/gift7.png',
          text: 'PVE套装'
        }
      ],
      current:0
    },
    initdata: {
      count: 0,
      lottery: 0,
      share: 0,
      grade:{},
      is_full: 0
    },
    user_info:{
      openid:"",
      session_key:"",
      encryptedData:"",
      iv:"",
      nickName:''
    },
    model1: {
      modelHidden: false,
      num:1,
      dwmc:'传奇',
      code:'FEW4RE343T'      
    },
    model2: {
      modelHidden: false,
      hasGift:false,
      countNum:0,
      gift_code: 'FEW4RE343T'
    },
    model3: {
      modelHidden: false,
      codearr:[]
    },
    star:{
      stars1_get:false,
      stars2_get: false,
      stars3_get: false,
      stars4_get: false,
      stars5_get: false,
      stars6_get: false,
      stars7_get: false
    }
  }, 
  swiperchange:function(e){
    this.data.swiper.current =e.detail.current;
    this.setData({
      swiper: this.data.swiper
    })
  }
  , swiperPrev: function (e) {
    --this.data.swiper.current < 0 && (this.data.swiper.current = 0);
    this.setData({
      swiper: this.data.swiper
    })
  }
  , swiperNext: function (e) {
    ++this.data.swiper.current > this.data.swiper.slides.length - 2 && (this.data.swiper.current = this.data.swiper.slides.length - 2);
    this.setData({
      swiper: this.data.swiper
    })
  }
  , onLoad:function(){
    var that=this; 
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: config.service.getOpenidUrl,
            data: {
              code: res.code
            },
            header: { "Content-Type": "application/x-www-form-urlencoded" },
            method: 'POST',
            success: function (data) {
              // console.log(data);
              that.data.user_info = data.data;
              that.setData({
                "user_info": that.data.user_info
              });
              wx.getUserInfo({
                success: function (res) {
                  // console.log(res);
                  that.data.user_info.nickName = res.userInfo.nickName;
                  that.setData({
                    "user_info": that.data.user_info
                  });
                }
              })
              //首页获取数据
              wx.request({
                url: config.service.getdataUrl,
                data: {
                  openid: that.data.user_info.openid
                },
                header: { "Content-Type": "application/x-www-form-urlencoded" },
                method: 'POST',
                success: function (data) {
                  that.data.initdata = data.data;
                  for (var i in data.data.is_gift_arr){
                    // if (!data.data.is_gift_arr[i]) {
                    // console.log(data.data[i])
                    if (!data.data.is_gift_arr[i] && i == 1 && data.data[i] && data.data[i] == 5) {
                        that.data.star.stars1_get = true;
                    } else if (!data.data.is_gift_arr[i] && i == 2 && data.data.grade[i] && data.data.grade[i] == 4) {
                        that.data.star.stars2_get = true;
                    } else if (!data.data.is_gift_arr[i] && i == 3 && data.data.grade[i] && data.data.grade[i] == 4) {
                        that.data.star.stars3_get = true;
                    } else if (!data.data.is_gift_arr[i] && i == 4 && data.data.grade[i] && data.data.grade[i] == 3) {
                        that.data.star.stars4_get = true;
                    } else if (!data.data.is_gift_arr[i] && i == 5 && data.data.grade[i] && data.data.grade[i] == 3) {
                        that.data.star.stars5_get = true;
                    } else if (!data.data.is_gift_arr[i] && i == 6 && data.data.grade[i] && data.data.grade[i] == 2) {
                        that.data.star.stars6_get = true;
                    } else if (!data.data.is_gift_arr[i] && i == 7 && data.data.grade[i] && data.data.grade[i] == 1) {
                        that.data.star.stars7_get = true;
                    }
                      // that.data.star["stars" + i + "_get"] = true;
                    // }
                  }

                  
                  that.setData({
                    "initdata": that.data.initdata,
                    "star": that.data.star
                  })
                }
              })
            }
          })
        } else {
          // console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },
  // 星星满后点击领礼包
  openGift: function (e) {
    var that = this;
    // 领礼包
    wx.request({
      url: config.service.giftUrl,
      data: {
        openid: that.data.user_info.openid,
        num: e.currentTarget.dataset.num
      },
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      method: 'POST',
      success: function (data) {
        if (data.data.status==0){
            that.data.model1.modelHidden = true;
            var arr = { 1: '传奇', 2: '大师', 3: '钻石', 4: '白金', 5: '黄金', 6: '白银', 7: '青铜' };
            that.data.model1.num = e.currentTarget.dataset.num;
            // that.data.model1.dwmc = e.currentTarget.dataset.arr[e.currentTarget.dataset.num];
            that.data.model1.dwmc = arr[e.currentTarget.dataset.num];
            that.data.model1.code = data.data.msg;
            that.data.star["stars" + e.currentTarget.dataset.num+"_get"] = false;
            that.setData({
              "model1": that.data.model1,
              "star": that.data.star
            });
        } else {
          wx.showToast({
            title: data.data.msg,
            icon: "none"
          })
        }
      }
    });
  },
  // 星星未满点击提示
  notOpenGift: function (e) {
    wx.showToast({
      title: '还未解锁',
      icon:"none"
    })
  },
  // 星星全部点亮操作
  fullStar: function (e) {
    wx.showToast({
      title: '段位已全部点亮',
      icon: "none"
    })
  },
   // 点亮新赛季
  lightStar:function(e){
    var that = this; 
    if (that.data.initdata.lottery>0){
      if (that.data.initdata.is_full==1){
        wx.showToast({
          title: '段位已全部点亮',
          icon: "none"
        })
      }else{
        wx.request({
          url: config.service.lightUrl,
          data: {
            openid: that.data.user_info.openid
          },
          header: { "Content-Type": "application/x-www-form-urlencoded" },
          method: 'POST',
          success: function (data) {
            if (data.data.status == 0) {
              that.data.initdata.lottery = data.data.lottery_num;
              for (var k in data.data.code){
                if (!that.data.initdata.grade){
                  that.data.initdata.grade={};
                }
                that.data.initdata.grade[k] = data.data.code[k];
                if (k == 1 && data.data.code[k]==5){
                  that.data.star.stars1_get=true;
                }else if (k == 2 && data.data.code[k] == 4) {
                  that.data.star.stars2_get = true;
                } else if (k == 3 && data.data.code[k] == 4) {
                  that.data.star.stars3_get = true;
                } else if (k == 4 && data.data.code[k] == 3) {
                  that.data.star.stars4_get = true;
                } else if (k == 5 && data.data.code[k] == 3) {
                  that.data.star.stars5_get = true;
                } else if (k == 6 && data.data.code[k] == 2) {
                  that.data.star.stars6_get = true;
                } else if (k == 7 && data.data.code[k] == 1) {
                  that.data.star.stars7_get = true;
                }
              }
              that.setData({
                "initdata": that.data.initdata,
                "star": that.data.star
              })
            } else if (data.data.status == 1) {
              that.data.initdata.lottery = data.data.lottery_num;
              for (var k in data.data.code) {
                if (!that.data.initdata.grade) {
                  that.data.initdata.grade = {};
                }
                that.data.initdata.grade[k] = data.data.code[k];
                if (k == 1 && data.data.code[k] == 5) {
                  that.data.star.stars1_get = true;
                } else if (k == 2 && data.data.code[k] == 4) {
                  that.data.star.stars2_get = true;
                } else if (k == 3 && data.data.code[k] == 4) {
                  that.data.star.stars3_get = true;
                } else if (k == 4 && data.data.code[k] == 3) {
                  that.data.star.stars4_get = true;
                } else if (k == 5 && data.data.code[k] == 3) {
                  that.data.star.stars5_get = true;
                } else if (k == 6 && data.data.code[k] == 2) {
                  that.data.star.stars6_get = true;
                } else if (k == 7 && data.data.code[k] == 1) {
                  that.data.star.stars7_get = true;
                }
              }
              that.setData({
                "initdata": that.data.initdata,
                "star": that.data.star
              })
              var num = data.data.count;
              var code = data.data.gift_code;
              that.data.model2.countNum = num;
              that.data.model2.gift_code = code;
              that.data.model2.modelHidden = true;
              if (num <= 500 || (num > 500 && /^(?:([1269])\1{2,})$/.test(num))) {
                that.data.model2.hasGift = true;
              } else {
                that.data.model2.hasGift = false;
              }
              that.setData({
                "model2": that.data.model2
              })
            } else {
              wx.showToast({
                title: data.data.msg,
                icon: "none"
              })
            }
          }
        })
      }
    } else {
      wx.showToast({
        // title: 'CA温馨提示：点击“召唤队友”分享到不同微信群 获取点亮次数噢~',
        title: '活动已结束，请关注公众号（quanminqiangzhan）了解更多福利活动',
        icon: "none"
      })
    }
  },
  // 查看我的礼包
  checkCode: function (e) {
    var that = this; 
    wx.request({
      url: config.service.myCodeUrl,
      data: {
        openid: that.data.user_info.openid
      },
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      method: 'POST',
      success: function (data) {
        if (data.data.data.length>0) {
          that.data.model3.modelHidden = true;
          that.data.model3.codearr= data.data.data;
          that.setData({
            model3: that.data.model3
          });
        }else {
          wx.showToast({
            title: "还没有礼包哦",
            icon: "none"
          })
        }
      }
    })
  },
  // 查看二维码
  opencode: function (e) {
    var that = this; 
    wx.previewImage({
      current: 'https://cdnstatic.yingxiong.com/qmqz/h5/wx_small/images/qrcode3.png', // 当前显示图片的http链接     
      urls: ['https://cdnstatic.yingxiong.com/qmqz/h5/wx_small/images/qrcode3.png'] // 需要预览的图片http链接列表     
    })
    wx.getImageInfo({// 获取图片信息（此处可不要）  
      src: 'https://cdnstatic.yingxiong.com/qmqz/h5/wx_small/images/qrcode3.png',
      success: function (res) {
      }
    })
  },
  closeModel: function (e) {
    // 关闭弹窗
    var name = e.currentTarget.dataset.name;
    var param={};
    this.data[name].modelHidden=false;
    param[name] = this.data[name];
    this.setData(param);
  },
  onShareAppMessage: function (res) {
    // 转发
    let that = this;
    let arr = ["4月不冲段，567月徒伤悲...别慌，先跟我来集个星星~", "游戏没外挂，排位我不怕~快来跟我一起点亮传奇段位！", "江湖救急！！！我还差颗星星就点亮传奇段位啦！~"];
    var title = '【' + (that.data.user_info.nickName || '') + '@我】 '+arr[Math.floor(Math.random()*arr.length)];
    return {
      title: title,
      path: '/pages/index/index',
      imageUrl:'https://cdnstatic.yingxiong.com/qmqz/h5/wx_small/images/share_img.jpg',
      success: function (res) {
        if (res.shareTickets){
          wx.getShareInfo({
            shareTicket: res.shareTickets,
            success: function (res) {
              that.data.user_info.encryptedData = res.encryptedData;
              that.data.user_info.iv = res.iv;
              that.setData({
                "user_info": that.data.user_info
              })
              // console.log(that.data.user_info.iv)
              //分享群--调用分享接口
              wx.request({
                url: config.service.sharetUrl,
                data: {
                  openid: that.data.user_info.openid,
                  session_key: that.data.user_info.session_key,
                  encryptedData: that.data.user_info.encryptedData,
                  iv: that.data.user_info.iv
                },
                header: { "Content-Type": "application/x-www-form-urlencoded" },
                method: 'POST',
                success: function (data) {
                  if (data.data.status == 0) {
                    wx.showToast({
                      title: data.data.msg,
                      icon: "none"
                    })
                    that.data.initdata.lottery = data.data.lottery_num;
                    that.data.initdata.share = data.data.share_num;
                    that.data.initdata.count = data.data.count;
                    that.setData({
                      "initdata": that.data.initdata
                    })
                    // console.log(that.data.initdata.share)
                  } else {
                    wx.showToast({
                      title: data.data.msg,
                      icon: "none"
                    })
                  }
                }
              });
            },
            fail: function () {
              wx.showToast({
                title: "转发群失败",
                duration: 2000
              });
            }
          })
        } else {
        
        }
       
        //getSystemInfo是为了获取当前设备信息，判断是android还是ios，如果是android
        //还需要调用wx.getShareInfo()，只有当成功回调才是转发群，ios就只需判断shareTickets
        // wx.getSystemInfo({
        //   success: function (d) {
        //     if (d.platform == 'android' && (res.shareTickets.length > 0)) {
        //       wx.getShareInfo({
        //         shareTicket: res.shareTickets,
        //         success: function () {
        //           console.log(res)
        //           // android分享群--调用分享接口
        //           wx.request({
        //             url: config.service.sharetUrl,
        //             data: {
        //               openid: that.data.user_info.openid
        //             },
        //             header: { "Content-Type": "application/x-www-form-urlencoded" },
        //             method: 'POST',
        //             success: function (data) {
        //               if (data.data.status == 0) {
        //                 if (data.data.share_num >= 3) {
        //                   wx.showToast({
        //                     title: data.data.msg,
        //                     icon: "none"
        //                   })
        //                 }
        //                 that.data.initdata.lottery = data.data.lottery_num;
        //                 that.data.initdata.share = data.data.share_num;
        //                 that.data.initdata.count = data.data.count;
        //                 that.setData({
        //                   "initdata": that.data.initdata
        //                 })
        //               } else {
        //                 wx.showToast({
        //                   title: data.data.msg,
        //                   icon: "none"
        //                 })
        //               }
        //             }
        //           })
        //         },
        //         fail: function () {
        //           wx.showToast({
        //             title: "转发群失败",
        //             duration: 2000
        //           });
        //         }
        //       })
        //     }
        //     if (d.platform == 'ios' && (res.shareTickets.length > 0)) {
        //       // ios分享群
        //       wx.request({
        //         url: config.service.sharetUrl,
        //         data: {
        //           openid: that.data.user_info.openid
        //         },
        //         header: { "Content-Type": "application/x-www-form-urlencoded" },
        //         method: 'POST',
        //         success: function (data) {
        //           if (data.data.status == 0) {
        //             if (data.data.share_num >= 3) {
        //               wx.showToast({
        //                 title: data.data.msg,
        //                 icon: "none"
        //               })
        //             }
        //             that.data.initdata.lottery = data.data.lottery_num;
        //             that.data.initdata.share = data.data.share_num;
        //             that.data.initdata.count = data.data.count;
        //             that.setData({
        //               "initdata": that.data.initdata
        //             })
        //           } else {
        //             wx.showToast({
        //               title: data.data.msg,
        //               icon: "none"
        //             })
        //           }
        //         }
        //       })
        //     }
        //   },
        //   fail: function (res) {
        //     wx.showToast({
        //       title: "转发失败",
        //       duration: 2000
        //     });
        //   }
        // })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  navigator:function(e){
    if (e.currentTarget.dataset.url != this.route){
      // console.log(e.currentTarget.dataset.url); 
      wx.navigateTo({ url: "/"+e.currentTarget.dataset.url});
    }
  },
  shareFriend: function (e) {
    var that = this; 
    wx.request({
      url: config.service.sharetUrl,
      data: {
        openid: that.data.user_info.openid,
        session_key: that.data.user_info.session_key,
        encryptedData: that.data.user_info.encryptedData,
        iv: that.data.user_info.iv
      },
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      method: 'POST',
      success: function (data) {
        if (data.data.status == 0) {
          wx.showToast({
            title: data.data.msg,
            icon: "none"
          })
          that.data.initdata.lottery = data.data.lottery_num;
          that.data.initdata.share = data.data.share_num;
          that.data.initdata.count = data.data.count;
          that.setData({
            "initdata": that.data.initdata
          })
          // console.log(that.data.initdata.share)
        } else {
          wx.showToast({
            title: data.data.msg,
            icon: "none"
          })
        }
      }
    });
  },
})

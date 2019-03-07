//微信二次分享
const ua = window.navigator.userAgent.toLowerCase();
if (ua.indexOf('micromessenger') > 0) {//微信浏览器才调用
  var authConfJson = {};
  $.ajax({
    url: '/uowap/wx/authconf',
    type: 'post',
    dataType: 'json',
    data: { 'share_url': window.location.href },
    success: function (data) {
      authConfJson = data;
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: authConfJson.appId, // 必填，公众号的唯一标识
        timestamp: authConfJson.timestamp, // 必填，生成签名的时间戳
        nonceStr: authConfJson.nonceStr, // 必填，生成签名的随机串
        signature: authConfJson.signature,// 必填，签名，见附录1
        jsApiList: [
          'onMenuShareAppMessage',
          'onMenuShareTimeline'
        ]
      });
    }
  });

  wx.ready(() => {
    //分享给朋友
    wx.onMenuShareAppMessage({
      title: dataConfig.appTitle, // 分享标题
      desc: dataConfig.shareContent, // 分享描述
      link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: imgUrl, // 分享图标 imgUrl + "share.jpg"
      type: 'link', // 分享类型,music、video或link，不填默认为link
      dataUrl: window.location.href, // 如果type是music或video，则要提供数据链接，默认为空
      success: function () {
        // 用户确认分享后执行的回调函数
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
      }
    })

    //分享到朋友圈
    wx.onMenuShareTimeline({
      title: dataConfig.appTitle, // 分享标题
      link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: imgUrl, // 分享图标 imgUrl + "share.jpg"
      success: function () {
        // 用户确认分享后执行的回调函数
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
      }
    })
  })
}

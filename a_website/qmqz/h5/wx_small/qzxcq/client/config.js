/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://h5.yingxiong.com';

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 获取openid地址，用于建立会话
        getOpenidUrl: `${host}/ca/new-season/ajax-openid.html`,
        // 获取首页返回的数据
        getdataUrl: `${host}/ca/new-season/index.html`,
        // 点亮操作
        lightUrl: `${host}/ca/new-season/ajax-dl.html`,
        // 分享操作
        sharetUrl: `${host}/ca/new-season/ajax-share-num.html`,
        // 领取礼包
        giftUrl: `${host}/ca/new-season/ajax-gift-code.html`,
        // 领取礼包
        myCodeUrl: `${host}/ca/new-season/ajax-my-code.html`,
    }
};

module.exports = config;

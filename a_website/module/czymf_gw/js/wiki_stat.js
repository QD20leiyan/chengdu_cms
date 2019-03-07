var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?cd3c5f317e3f5ced9e323d594c3eb7b3";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
   //push 手动上报方法，event 事件触发方法 ，ready js加载完成回调 
   //push 参数，name：页面名称，behavior 行为 
   //event 参数，event：事件名称，args 拓展参数 
   var HLog={push:function(name,behavior){},setUser:function(){},event:function(event,args){},ready:function(){}};
   HLog.config={
       "senseHash":0, //hash锚点是否进入url统计
       "senseQuery":0, //url参数是否进入url统计
       "ignoreParams":[] //开启url参数上报时，可忽略部分参数拼接上报；
   };
   (function() {
      var hl = document.createElement("script");
 if((/iphone|android|mobile/i.test(navigator.userAgent.toLowerCase()))) {
                 hl.src = "http://spro.yingxiong.com/datastat/jsapi/jssdk/appid/44/client/2/filter/stat.js";
}else{
                    hl.src = "http://spro.yingxiong.com/datastat/jsapi/jssdk/appid/44/client/1/filter/stat.js";
}
      hl.async = "async";
      var s = document.getElementsByTagName("script")[0];
      HLog.ready = function(){
      HLog.push('reflash')
      };
      s.parentNode.insertBefore(hl, s);
   })();

!function(e,t,n,g,i){e[i]=e[i]||function(){(e[i].q=e[i].q||[]).push(arguments)},n=t.createElement("script"),tag=t.getElementsByTagName("script")[0],n.async=1,n.src=('https:'==document.location.protocol?'https://':'http://')+g,tag.parentNode.insertBefore(n,tag)}(window,document,"script","assets.growingio.com/2.1/gio.js","gio");
  gio('init','8b582ed30d3969f0', {});
gio('send');


<div class="wrap" >
    <div class="top">
        <div class="logo">
            <img alt="全名枪战logo" src="http://static.local.yingxiong.com/qmqz/1.0/pc/images/logo.png">
        </div>
        <div class="top01">
            <a class="cur" href="/index.html">首页</a>
            <a href="/article/list/cid/1.html">资讯站</a>
            <a target="_blank" href="http://bbs.yingxiong.com/forum.php?mod=forumdisplay&fid=99">论坛</a>
        </div>
        <div class="top02">
            <img alt="全名枪战" src="http://static.local.yingxiong.com/qmqz/1.0/pc/images/nav_logo.png">
            <div class="top02_r">
                <a target="_blank" href="http://i.yingxiong.com/oauth/Register?time=1430812902&sign=348cf6301e9290b44a8a29bdb52f0b13&appKey=yingxiongqmqz&callback=http%3A%2F%2Fca.yingxiong.com%2FIndex%2Findex%2F">注册</a>
                <a target="_blank" href="http://i.yingxiong.com/oauth/GetAccessCode?time=1430812902&sign=dbf570cb10a933d46e6b8dff5a19e97e&appKey=yingxiongqmqz&callback=http://i.yingxiong.com/center/my">登陆</a>
            </div>
        </div>
        <div class="clear"></div>
    </div>
<style>
    .container_404{ width: 100%; height: 735px; text-align: center;margin-top: 100px;color: red;font-size: 50px;}
    .wrap_404 .r_time{ text-align: center; color: #3a3939; font-size: 16px; margin-bottom: 10px;}
</style>
<div class="container_404">
    你访问的页面不存在  <p class="r_time"><span id="times">5</span>秒后自动返回</p>
</div>
<script type="text/javascript" src="http://cdnstatic.yingxiong.com/qmqz/1.0/pc/js/jquery-1.11.2.min.js"></script>
<script>
    $(function(){
        //	倒计时
        var times=$("#times").text();
        var timer;
        timer=setInterval(function(){
                times--;
                $("#times").text(times);
                if(times<1){
                    clearInterval(timer);
                    location.href="/";
                }
            }
            ,500);
    })
</script>
</div>
        var  h5_wx=$(".h5_wx").html();
        var  h5_data=$(".h5_data").html();
        var verify_url='/commonMethod/ajax-yuyue-verify.html?h5data='+h5_data;//登录发送验证码
        var login_url="/sm/jinli/login.html?h5data="+h5_data;//登录请求
        var user_info="/sm/jinli/check-user.html?h5data="+h5_data;//用户检查
        var my_term="/sm/jinli/my-team.html?h5data="+h5_data;//我的战队
        var send_board="/sm/jinli/get-top.html?h5data="+h5_data;//获取排行榜
        var cj_yterm="/sm/jinli/create-team.html?h5data="+h5_data;//创建战队
        var sel_xxterm="/sm/jinli/get-school-team.html?h5data="+h5_data;//获取选择的本校战队列表
        var term_info="/sm/jinli/team-info.html?h5data="+h5_data;//获取战队详情
        // 拉取本校战队
        var join_term="/sm/jinli/join-team.html?h5data="+h5_data;//加入战队
        var my_gift="/sm/jinli/my-gift.html?h5data="+h5_data;//我的礼包
        var jinli_ts="/sm/jinli/jinli-alert.html?h5data="+h5_data;//锦鲤名单
        var jl_info="/sm/jinli/jinli-info.html?h5data="+h5_data;//锦鲤奖信息登记
        var srf = $('meta[name="csrf-token"]').attr('content');
        var state = {
            title:"",
            url : ""
        };
        var type5="";
        var type_name="";
        var is_focus=0;//input获取事件焦点
        var type_id="";
         var lbs_uid="";//选择学校的uid
        var selxx_name="";//选择学校的名字
        var sc_city="";//选择学校城市
        var sc_province="";//选择学校的省份
        var sc_lat="";//选择学校的经度
        var sc_lng="";//选择学校的维度 
         var lbs_uid1="";//选择学校的uid
        var selxx_name1="";//选择学校的名字
        var sc_lat1="";//选择学校的经度
        var sc_lng1="";//选择学校的维度
        var ni_name="";//昵称  
        var team_id="";//战队id
        var my_lng="";
        var my_lat="";
        var share_term_id="";
        var team_shareid="";//分享的team_id
        var school_lbs_uid2="";
        var city="";
        var province="";
        var school_sendname="";
        var shi_sendname="";
        var shen_sendname="";
                // 请求学校列表
        function sel_shool(lbs_uid,selxx_name,sc_lat,sc_lng){
            $(".tc_box2 .btn_tc_jl").removeClass("share_team");
            console.log(lbs_uid);//选择学校的uid
            console.log(selxx_name);//选择学校的名字
            console.log(sc_lat);//选择学校的经度
            console.log(sc_lng);//选择学校的维度
            $.ajax({
                'url':sel_xxterm,
                'data':{'lbs_uid':lbs_uid},
                'type':'POST',
                'dataType':'Json',
                success:function(data){
                    if(data.code==0){

                        if(data.data != ""){
                            // 有探险队
                            var result2="";
                            for(var i = 0;i < data.data.length; i++) {
                                var tm_li =data.data[i].name;
                                var tm_id =data.data[i].id;
                                result2 +='<li data-id="' + tm_id +'"><p>'+tm_li+"</p><i></i></li>";
                            }
                            $(".tc_box2 .sel_box ul").html(result2);
                            $(".tc.tc_box2 .sel_box").show();
                            $(".tc_box2 .school_name").html(selxx_name);
                            $(".tc").removeClass("active");
                            $(".tc.tc_box2").addClass("active");

                        }else{
                             //没有探险队
                            $(".tc_box1 .school_name").html(selxx_name);
                            $(".tc").removeClass("active");
                            $(".tc.tc_box1").addClass("active");
                        }
                    }else{
                        
                    }
                }
            });
            lbs_uid1=lbs_uid;//选择学校的uid
            selxx_name1=selxx_name;//选择学校的名字
            sc_lat1=sc_lat;//选择学校的经度
            sc_lng1=sc_lng;//选择学校的维度    
        }
        //判断team_id;
        function md_ym_sy(){
            var num = 0;
                var timer = setInterval(function () {
                    if (!window.HLog) {
                        num++;
                        if (num >= 10) {
                            clearInterval(timer);
                        }
                    } else {
                        HLog.push("sm_jinli_page1_login");
                        clearInterval(timer);
                    }
                }, 500);
        }
        function is_wx() {
        var ua = navigator.userAgent.toLowerCase();
        return ua.match(/MicroMessenger/i) == 'micromessenger';
        }
        //是否QQ
        function is_qq() {
        var ua = navigator.userAgent.toLowerCase();
        return !!ua.match(/mqqbrowser|qzone|qqbrowser/i);
        }
        function is_qq1(){
        var ua = navigator.userAgent.toLowerCase();
        return ua.match(/QQ/i) == "qq";
        }
    
        
$(function(){
    var map = new AMap.Map('allmap', {
            resizeEnable: true,
            zoom: 13,
    });
    var imgurl=$("body").data("imgurl");
    var share_icon="http:"+imgurl+"images/share4.png";//分享图片
    var share_title="寻找创魔锦鲤，欧气领福利！你也快来吧";//分享文案
    var share_desc="";//分享描述
    var share_link="https://h5.yingxiong.com/index/sm/jinli.html";//分享描述
    var share = {
            imgUrl      : share_icon,
            shareTitle  : share_title,
            descContent : share_desc,
            lineLink    : share_link,
        };
        wx.config({
            debug     : false,
            appId     : wx_conf.appId,
            timestamp : wx_conf.timestamp,
            nonceStr  : wx_conf.nonceStr,
            signature : wx_conf.signature,
            jsApiList : [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'chooseImage',
                'previewImage',
                'uploadImage',
                'downloadImage'
            ]
        });
               // 分享
    function wx_o(){
            wx.onMenuShareAppMessage({
                title   : share.shareTitle,
                desc    : share.descContent,
                link    : share.lineLink,
                imgUrl  : share.imgUrl,
                success : function() {

                }
            });
            wx.onMenuShareTimeline({
                title   : share.shareTitle,
                desc    : share.descContent,
                link    : share.lineLink,
                imgUrl  : share.imgUrl,
                success : function() {
                }
            });
            wx.onMenuShareQQ({
                title: share.shareTitle,
                desc: share.descContent,
                link: share.lineLink,
                imgUrl: share.imgUrl,
                success : function() {

                },
                cancel: function (s) {
                    // 用户取消分享后执行的回调函数
                }
            });
            console.log(share.shareTitle);
            console.log(share.imgUrl);
            console.log(share.lineLink);
    }
    wx.ready(function(){
        wx_o();
        console.log(share.shareTitle);
        console.log(share.imgUrl);
        console.log(share.lineLink);
    })
    // 关闭页面
    function CloseWebPage() {     
    if (navigator.userAgent.indexOf("MSIE") > 0) {     
         if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {     
             window.opener = null; window.close();     
         }     
         else {     
             window.open('', '_top'); window.top.close();     
         }     
    }     
    else if (navigator.userAgent.indexOf("Firefox") > 0) {     
         window.location.href = 'about:blank '; //火狐默认状态非window.open的页面window.close是无效的    
         //window.history.go(-2);     
    }     
    else {     
         window.opener = null;      
         window.open('', '_self', '');     
         window.close();     
    }     
    }
    if(is_wx()){
        $(".share_bg img").removeClass("active");
        $(".share_bg img.share2").addClass("active");
    }else if(is_qq()){
        $(".share_bg img").removeClass("active");
        $(".share_bg img.share2").addClass("active");
    }else if(is_qq1()){
        $(".share_bg img").removeClass("active");
        $(".share_bg img.share2").addClass("active");
    }else{
        $(".share_bg img").removeClass("active");
        $(".share_bg img.share1").addClass("active");
    }
        md_ym_sy();
        function GetQueryString(name) {  
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
            var r = window.location.search.substr(1).match(reg);  //获取url中"?"符后的字符串并正则匹配
            var context = "";  
            if (r != null)  
                 context = r[2];  
            reg = null;  
            r = null;  
            return context == null || context == "" || context == "undefined" ? "" : context;  
        }
        team_shareid=GetQueryString("team_id");
        console.log(team_shareid);
        var my_gift_list=[];
        var school_lid=[];
                 //定位
        function local(){
            var options = {
                'showButton': true,//是否显示定位按钮
                'buttonPosition': 'LB',//定位按钮的位置
                /* LT LB RT RB */
                'buttonOffset': new AMap.Pixel(10, 20),//定位按钮距离对应角落的距离
                'showMarker': true,//是否显示定位点
                'markerOptions':{//自定义定位点样式，同Marker的Options
                    'offset': new AMap.Pixel(0, 0),
                    'content':'<img src="https://a.amap.com/jsapi_demos/static/resource/img/user.png" style="width:1.5rem;height:1.5rem"/>'
                },
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 3000,          //超过10秒后停止定位，默认：5s
                buttonPosition:'RB',    //定位按钮的停靠位置
                buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                zoomToAccuracy: false,   //定位成功后是否自动调整地图视野到定位点
                
            }
            var startIcon = new AMap.Icon({
                // 图标尺寸
                size: new AMap.Size(25, 34),
                // 图标的取图地址
                image: imgurl+'/images/school.png',
                // 图标所用图片大小
                imageSize: new AMap.Size(22, 25),
                // 图标取图偏移量
                imageOffset: new AMap.Pixel(-9, -3)
            });
            //解析定位结果
            function onComplete(data) {
                console.log(data)
                // document.getElementById('status').innerHTML='定位成功'
                document.getElementById('address').innerHTML=data.formattedAddress;
                my_lnglag=[data.position.lng,data.position.lat];
                my_lng=data.position.lng;
                my_lat=data.position.lat;
                city=data.addressComponent.city;
                province=data.addressComponent.province;
                console.log(my_lnglag);
                map.setCenter(my_lnglag);
                AMap.service(["AMap.PlaceSearch"], function() {
                //构造地点查询类
                    var placeSearch = new AMap.PlaceSearch({
                        type:'学校', // 兴趣点类别
                        pageSize: 50, // 单页显示结果条数
                        pageIndex: 1, // 页码
                        // city: "028", // 兴趣点城市
                        citylimit: true,  //是否强制限制在设置的城市内搜索
                       // map: map, // 展现结果的地图实例
                       // panel: "panel", // 结果列表将在此容器中进行展示。
                        autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
                    });
                    var cpoint = my_lnglag; //中心点坐标
                    var circle = new AMap.Circle({
                        center: cpoint,
                        radius: 2500, //半径
                        borderWeight: 3,
                        strokeColor: "#FF33FF",
                        strokeOpacity: 1,
                        strokeWeight: 6,
                        strokeOpacity: 0,
                        fillOpacity: 0.4,
                        strokeStyle: 'dashed',
                        strokeDasharray: [10, 10],
                        // 线样式还支持 'dashed'
                        fillColor: '#1791fc',
                        zIndex: 50,
                    });
                    circle.setMap(map);
                    var list2=[];
                    placeSearch.searchNearBy('', cpoint, 5000, function(status, result){
                        var my_schoolList=result.poiList.pois;
                        var list2=[];
                        for(var i=0;i<my_schoolList.length;i++){
                            var result2=my_schoolList[i].type.split(";");
                            if(!(result2.indexOf("幼儿园") != -1 || result2.indexOf("幼儿园|科教文化服务") != -1 || result2.indexOf("成人教育") != -1)){
                                var sc_id=my_schoolList[i].id;
                                var sc_name=my_schoolList[i].name;
                                var my_lnglat=[my_schoolList[i].location.lng,my_schoolList[i].location.lat];
                                list2.push({
                                    icon:imgurl+'images/school.png',
                                    position:my_lnglat,
                                    school_name:sc_name,
                                    id:sc_id,
                                });
                            }
                        } console.log(list2);
                        AMapUI.loadUI(['overlay/SimpleInfoWindow'], function(SimpleInfoWindow) {
                            console.log(list2[0])
                            list2.forEach(function(marker) {
                                var markerObj =new AMap.Marker({
                                    map: map,
                                    icon: marker.icon,
                                    position: [marker.position[0], marker.position[1]],
                                    offset: new AMap.Pixel(-13, -30),
                                    school_name:marker.school_name,
                                    id:marker.id,
                                    pname:marker.pname,
                                    cityname:marker.cityname,
                                });
                                var infoWindow = new SimpleInfoWindow({
                                    infoTitle: '<p class="sc_tl">'+marker.school_name+'</p>',
                                    infoBody: "<a href='javascript:;' class='sel_this' onclick='sel_shool(\""+marker.id +"\",\""+marker.school_name+"\",\""+marker.position[0]+"\",\""+marker.position[1]+"\")' data-id='"+ marker.id +"' data-name='"+ marker.school_name+ "'></a>",
                                    //基点指向marker的头部位置
                                    offset: new AMap.Pixel(0, -31)
                                });
                                school_lid.push(marker.id);
                                function openInfoWin() {
                                    infoWindow.open(map,marker.position);
                                }
                                //marker 点击时打开
                                AMap.event.addListener(markerObj,'click', function(e) {console.log(e);
                                    openInfoWin();
                                });
                            });
                        });
                    });
                });
            }
            AMap.plugin(['AMap.Geolocation','AMap.ToolBar'],function() {
                var geolocation = new AMap.Geolocation(options);
                map.addControl(geolocation);
                geolocation.getCurrentPosition(function(status,result){
                    if(status=='complete'){
                        onComplete(result);
                        map.addControl(new AMap.ToolBar({
                        // 简易缩放模式，默认为 false
                            liteStyle: true
                        }));
                    }else{
                        onError(result)
                    }
                });
        
            });
            //解析定位错误信息
            function onError(data) {
                alert("暂未获得定位权限，请复制该链接在其他APP或浏览器内打开。");
                $("body").hide();
                CloseWebPage();
                wx.closeWindow();
            }

        }
        local();
         //设备类型判断
        function type(){
            var u = navigator.userAgent,
               app = navigator.appVersion;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
            var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if(isIOS) {
              type_id="ios";
            }
            if(isAndroid) {
              type_id="android";
            }
        }
        type();
        //图片验证码刷新
        var imgMarkIndex=1;
        function load_captcha(){
            imgMarkIndex++;
            var imgUrl = "/commonMethod/captcha.html?refresh=" + imgMarkIndex;
            $.get(imgUrl, {}, function(data) {
                $(".content_box>p .co_codebtn2 img").css("display","block");
                $(".content_box>p .co_codebtn2 i").hide();
                $(".co_captcha").attr("src",data.url);
                $(".co_imgtxt").addClass("hidden");
            }, 'json');
        }
        //倒计时
        function page_djs(ele, callback){
            var time = 60;
            if(ele) {
                ele.html("60s");
            }
            djs_timer = setInterval(function() {
                time--;
                ele.html((time<=0?0:time) + "s");
                if(time == 0) {
                    clearInterval(djs_timer);
                    ele.html("获取验证码");
                    ele.addClass("active");
                    if(callback) {
                        callback();
                    }
                }
            }, 1000);
        }
        // 用户检查
        function user_chexk(){
            var user_tel=$(".content_box .co_username").val();
             $.ajax({
                'url':user_info,
                'data':{'phone':user_tel},
                'type':'POST',
                'dataType':'Json',
                success:function(data){
                    if(data.code==0){
                        if(data.data.nickname != ""){
                            $(".act_name").val(data.data.nickname);
                            $(".act_name").attr("readOnly","true");
                        }else{
                            // alert(data.data.nickname);
                        }
                    }else{
                        
                    }
                }
            });
           
        }
        //战队详情
        function term_text(){
            $.ajax({
                'url':term_info,
                'data':{"team_id":team_id},
                'type':'POST',
                'dataType':'Json',
                success:function(data){

                    if(data.code==0){
                        share_term_id=team_id;
                        school_lbs_uid2=data.data.school_lbs_uid;
                        school_sendname=data.data.school_name;
                        shi_sendname=data.data.city;
                        shen_sendname=data.data.province;
                        share.lineLink="http://h5.yingxiong.com/index/sm/jinli.html?team_id="+share_term_id;
                            history.pushState(state, "", "?team_id="+share_term_id);
                            if(data.data.is_captain){
                                share.imgUrl="http:"+imgurl+"images/share1.png";//分享图片
                                share.shareTitle="我的"+data.data.name+"探险队就差你！";//分享文案
                                wx_o();
                            }else{
                                share.imgUrl="http:"+imgurl+"images/share2.png";//分享图片
                                share.shareTitle=data.data.name+"战队宇宙第一帅！我已经加入了，你呢?";//分享文案
                                wx_o();
                            }
                            if(data.data.top_num != null){
                                $(".swiper4 .send_box2 .dy_all span").html(data.data.top_num);
                            }else{
                                $(".swiper4 .send_box2 .dy_all span").html("0");
                            }
                            // if(data.data.top_num != null){
                            //     $(".swiper4 .rq_send1 .send2").html(data.data.num);
                            // }else{
                            //     $(".swiper4 .rq_send1 .send2").html("0");
                            // }
                            if(data.data.school_top != null){
                                $(".swiper4 .rq_send1 .send3").html(data.data.school_top);
                                $(".swiper5 .rq_send1 .send1").html(data.data.school_top);
                            }else{
                                $(".swiper4 .rq_send1 .send3").html("0");
                                $(".swiper5 .rq_send1 .send1").html("0");
                            }
                            if(data.data.school_total != null){
                                $(".swiper5 .rq_send1 .send2").html("/共"+data.data.school_total);
                            }else{
                                $(".swiper5 .rq_send1 .send2").html("0");
                            }
                            if(data.data.city_top != null){
                                $(".swiper5 .rq_send2 .send1").html(data.data.city_top);
                            }else{
                                $(".swiper5 .rq_send2 .send1").html("0");
                            }
                            if(data.data.city_total != null){
                                $(".swiper5 .rq_send2 .send2").html("/共"+data.data.city_total);
                            }else{
                                $(".swiper5 .rq_send2 .send2").html("/共0");
                            }
                            if(data.data.province_top != null){
                                $(".swiper5 .rq_send3 .send1").html(data.data.province_top);
                            }else{
                                $(".swiper5 .rq_send3 .send1").html("0");
                            }
                            if(data.data.province_total != null){
                                $(".swiper5 .rq_send3 .send2").html("/共"+data.data.province_total);
                            }else{
                                $(".swiper5 .rq_send3 .send2").html("/共0");
                            }
                            $(".swiper4 .my_term").html(data.data.name+"探险队");
                            $(".swiper5 .my_term").html(data.data.name+"探险队");
                             
                            if(data.data.num >= 5){
                                $(".swiper4 .rq_num .send1").addClass("active");
                            }
                            if(data.data.num >= 10){
                                $(".swiper4 .rq_num .send2").addClass("active");
                            }
                            if(data.data.num >= 50){
                                $(".swiper4 .rq_num .send3").addClass("active");
                            }
                            if(data.data.num >= 100){
                                $(".swiper4 .rq_num .send4").addClass("active");
                            }
                            var memberlist="";
                             for(var i = 0;i < data.data.member.length; i++) {
                               var member_name=data.data.member[i].nickname;
                               memberlist +='<li>'+member_name+"</li>"
                            }

                            $(".cy_name ul").html(memberlist);
                            $(".tc").removeClass("active");
                            setTimeout(function(){
                            $(".swiper-slide").addClass("hidden");
                            HLog.push("sm_jinli_page4_team_info");
                            $(".swiper-slide.swiper4").removeClass("hidden");
                             },100);
                    }else{
                        alert(data.msg);
                    }
                }
            });
        }
        function term_text3(){
            $.ajax({
                'url':term_info,
                'data':{"team_id":team_id},
                'type':'POST',
                'dataType':'Json',
                success:function(data){
                    if(data.code==0){
                            if(data.data.school_top != null){
                                $(".swiper5 .rq_send1 .send1").html(data.data.school_top);
                            }else{
                                $(".swiper5 .rq_send1 .send1").html("0");
                            }
                            if(data.data.school_total != null){
                                $(".swiper5 .rq_send1 .send2").html("/共"+data.data.school_total);
                            }else{
                                $(".swiper5 .rq_send1 .send2").html("0");
                            }
                            if(data.data.city_top != null){
                                $(".swiper5 .rq_send2 .send1").html(data.data.city_top);
                            }else{
                                $(".swiper5 .rq_send2 .send1").html("0");
                            }
                            if(data.data.city_total != null){
                                $(".swiper5 .rq_send2 .send2").html("/共"+data.data.city_total);
                            }else{
                                $(".swiper5 .rq_send2 .send2").html("/共0");
                            }
                            if(data.data.province_top != null){
                                $(".swiper5 .rq_send3 .send1").html(data.data.province_top);
                            }else{
                                $(".swiper5 .rq_send3 .send1").html("0");
                            }
                            if(data.data.province_total != null){
                                $(".swiper5 .rq_send3 .send2").html("/共"+data.data.province_total);
                            }else{
                                $(".swiper5 .rq_send3 .send2").html("/共0");
                            }
                            if(data.data.num >= 5){
                                $(".swiper4 .rq_num .send1").addClass("active");
                            }
                            if(data.data.num >= 10){
                                $(".swiper4 .rq_num .send2").addClass("active");
                            }
                            if(data.data.num >= 50){
                                $(".swiper4 .rq_num .send3").addClass("active");
                            }
                            if(data.data.num >= 100){
                                $(".swiper4 .rq_num .send4").addClass("active");
                            }
                    }else{
                        alert(data.msg);
                    }
                }
            });
        }
        //分享判断
        function term_text2(){
            if(team_shareid == "" || team_shareid == undefined){

            }else{
                $.ajax({
                    'url':term_info,
                    'data':{"team_id":team_shareid},
                    'type':'POST',
                    'dataType':'Json',
                    success:function(data){
                        if(data.code==0){
                            selxx_name1=data.data.school_name;
                            if(data.data.is_member){
                                alert("您已是"+data.data.name+"探险队队员~");
                                $(".tc_box2 .btn_tc_jl").removeClass("share_team");
                            }else{
                                $(".tc_box2 .btn_tc_jl").addClass("share_team");
                                console.log(school_lid);
                                for(var i=0;i<school_lid.length;i++){
                                    if(data.data.school_lbs_uid=school_lid[i]){
                                        $(".tc_box2 .school_name").html(data.data.school_name+"<br>"+data.data.name);
                                        $(".tc_box2 .info_text").html("探险队邀请你加入");
                                        $(".tc.tc_box2 .sel_box").hide();
                                    }else{
                                        $(".tc_box2 .school_name").html(data.data.school_name+"<br>"+data.data.name);
                                        $(".tc_box2 .info_text").html("探险队因与你地域不符，不可加入~不要灰心，还有这些探险队等着你！");
                                        $(".tc.tc_box2 .sel_box").show();
                                    }
                                }
                                $(".tc.tc_box2").addClass("active");
                            }
                        }else{
                            alert(data.msg);
                        }
                    }
                });

            }
        }
        function isInArray(arr,value){
            for(var i = 0; i < arr.length; i++){
                if(value === arr[i]){
                    return true;
                }
            }
            return false;
        }
        //登录请求
        function get_login(){
            var user_tel=$(".content_box .co_username").val();
            var tp_yzm=$(".content_box .code1").val();
            var dx_yzm=$(".content_box .code2").val();
            var user_name=$(".content_box .act_name").val();
            if(user_tel == "" || user_tel == undefined) {
                alert("请输入手机号~");
                return;
            }else if(user_tel.length != 11){
                 alert("手机号码不正确哦");
                return;
            }
            if(dx_yzm == "" || dx_yzm == undefined) {
                alert("请输入短信验证码~");
                return;
            }
            if(user_name == "" || user_name == undefined) {
                alert("请输入您的昵称~");
                return;
            }
            $.ajax({
                'url':login_url,
                'data':{'phone':user_tel,'yzm':dx_yzm,"nickname":user_name,"lat":my_lng,"lng":my_lat,"cms_csrf":srf},
                'type':'POST',
                'dataType':'Json',
                success:function(data){
                    if(data.code==0){
                        HLog.event("sm_jinli_login_succ");
                        HLog.push("sm_jinli_page2_map");
                        local();
                        if(data.data.is_captain){
                            $(".is_nocp").hide();
                            $(".kd_btn1").css("display","block");
                            $(".btn_tc_nojl").addClass("no_choose");
                            $(".tc_box1 .btn_tc_jl").addClass("no_choose");
                        }else{
                            $(".kd_btn1").css("display","none");
                            $(".is_nocp").show();
                            $(".btn_tc_nojl").removeClass("no_choose");
                            $(".tc_box1 .btn_tc_jl").removeClass("no_choose");
                        }

                        ni_name=user_name;
                        $(".swiper1").addClass("hidden");
                        $(".swiper2").removeClass("hidden");
                        console.log(data.data.gift.length);
                        my_gift_list=data.data.gift;
                        term_text2();
                        alertGift();
                    }else{
                        HLog.event("sm_jinli_login_fail");
                        load_captcha();
                        alert(data.msg);
                    }
                }
            });
        }
        //获取排行榜
        function phb_list(){
           term_text3();
           share.lineLink="https://h5.yingxiong.com/index/sm/jinli.html?team_id="+share_term_id;
           history.pushState(state, "", "?team_id="+share_term_id);
           wx_o();
            console.log(type5);
            type5 = $(".swiper5 .send_box2 .sel_box2").find("li.active").data("id");
            type_name=school_lbs_uid2;
            if(type5 == 0){
                type_name=school_lbs_uid2;
            }
            if(type5 == 1){
                type_name=shi_sendname;
            }
            if(type5 ==2){
                type_name=shen_sendname;
            }
            $.ajax({
                'url':send_board,
                'data':{"type":type5,"name":type_name},
                'type':'POST',
                'dataType':'Json',
                success:function(data){
                    if(data.code==0){
                                var result_x="";
                                for(var i = 0;i < data.data.length; i++) {
                                var xph_i = data.data[i].top ;
                                var xph_li2 =data.data[i].name;
                                result_x +="<li><i>"+xph_i+"</i>"+xph_li2+"</span></p></li>";
                                 }
                                 console.log(result_x);
                                $(".swiper5 .send_box2 .sel_box3").html(result_x);
                                $(".swiper5 .send_box2 .sel_box3").removeClass("active");
                                $(".swiper5 .send_box2 .sel_box3.sel_box3_x").addClass("active");
                            $(".tc").removeClass("active");
                            setTimeout(function(){
                            $(".swiper-slide").addClass("hidden");
                            HLog.push("sm_jinli_page5_team_pm");
                            $(".swiper-slide.swiper5").removeClass("hidden");
                            },100);
                    }else{
                         alert(data.msg);
                    }
                }
            });

        }

        //弹出礼包弹框
        function alertGift(){
            if(my_gift_list.length>0){
                for(var i = 0;i < my_gift_list.length; i++) {
                    switch(my_gift_list[i].type){
                        case 1:
                        if(my_gift_list[i].code != null){
                            $(".tc.tc_box5 .gift_code span").html(my_gift_list[i].code);
                            $(".tc.tc_box5").addClass("active");
                        }else{
                            $(".tc.tc_box5").removeClass("active");
                        }
                        break;
                        case 5:
                        if(my_gift_list[i].code != null){
                            $(".tc.tc_box6 .captain").html(ni_name);
                            $(".tc.tc_box6 .result").html("您的探险队超过了5人！宇宙最6！");
                            $(".tc.tc_box6 .gift_code span").html(my_gift_list[i].code);
                            $(".tc.tc_box5").removeClass("active");
                            $(".tc.tc_box6").addClass("active");
                        }else{
                            $(".tc.tc_box5").removeClass("active");
                            $(".tc.tc_box6").removeClass("active");
                        }
                        break;
                        case 10:
                        if(my_gift_list[i].code != null){
                            $(".tc.tc_box6 .captain").html(ni_name);
                            $(".tc.tc_box6 .result").html("你的探险队超过了10人！宇宙最6！");
                            $(".tc.tc_box6 .gift_code span").html(my_gift_list[i].code);
                            $(".tc.tc_box5").removeClass("active");
                            $(".tc.tc_box6").addClass("active");
                        }else{
                            $(".tc.tc_box5").removeClass("active");
                            $(".tc.tc_box6").removeClass("active");
                        }
                        break;
                        case 50:
                        if(my_gift_list[i].code != null){
                            $(".tc.tc_box6 .captain").html(ni_name);
                            $(".tc.tc_box6 .result").html("你的探险队超过了50人！宇宙最6！");
                            $(".tc.tc_box6 .gift_code span").html(my_gift_list[i].code);
                            $(".tc.tc_box5").removeClass("active");
                            $(".tc.tc_box6").addClass("active");
                        }else{
                            $(".tc.tc_box5").removeClass("active");
                            $(".tc.tc_box6").removeClass("active");
                        }
                        break;
                        case 100:
                        if(my_gift_list[i].code != null){
                            $(".tc.tc_box6 .captain").html(ni_name);
                            $(".tc.tc_box6 .result").html("你的探险队超过了100人！宇宙最6！");
                            $(".tc.tc_box6 .gift_code span").html(my_gift_list[i].code);
                            $(".tc.tc_box5").removeClass("active");
                            $(".tc.tc_box6").addClass("active");
                        }else{
                            $(".tc.tc_box5").removeClass("active");
                            $(".tc.tc_box6").removeClass("active");
                        }
                        break;
                        case 2:
                        if(my_gift_list[i].code != null){
                            $(".tc.tc_box6 .captain").html(ni_name);
                            $(".tc.tc_box6 .result").html("你所在的队伍获得本地第一名!");
                            $(".tc.tc_box6 .gift_code span").html(my_gift_list[i].code);
                            $(".tc.tc_box5").removeClass("active");
                            $(".tc.tc_box6").addClass("active");
                        }else{
                            $(".tc.tc_box5").removeClass("active");
                            $(".tc.tc_box6").removeClass("active");
                        }
                        break;
                        case 3:
                        if(my_gift_list[i].code != null){
                            $(".tc.tc_box6 .captain").html(ni_name);
                            $(".tc.tc_box6 .result").html("你所在的队伍获得本市第一名!");
                            $(".tc.tc_box6 .gift_code span").html(my_gift_list[i].code);
                            $(".tc.tc_box5").removeClass("active");
                            $(".tc.tc_box6").addClass("active");
                        }else{
                            $(".tc.tc_box5").removeClass("active");
                            $(".tc.tc_box6").removeClass("active");
                        }
                        break;
                        case 7:
                        if(my_gift_list[i].code != null){
                            $(".tc.tc_box6 .captain").html(ni_name);
                            $(".tc.tc_box6 .result").html("你所在的队伍获得本省第一名!");
                            $(".tc.tc_box6 .gift_code span").html(my_gift_list[i].code);
                            $(".tc.tc_box5").removeClass("active");
                            $(".tc.tc_box6").addClass("active");
                        }else{
                            $(".tc.tc_box5").removeClass("active");
                            $(".tc.tc_box6").removeClass("active");
                        }
                        break;
                        case 8:
                        if(my_gift_list[i].code != null){
                            $(".tc.tc_box6 .captain").html(ni_name);
                            $(".tc.tc_box6 .result").html("你所在的队伍获得本省第二名!");
                            $(".tc.tc_box6 .gift_code span").html(my_gift_list[i].code);
                            $(".tc.tc_box5").removeClass("active");
                            $(".tc.tc_box6").addClass("active");
                        }else{
                            $(".tc.tc_box5").removeClass("active");
                            $(".tc.tc_box6").removeClass("active");
                        }
                        break;
                        case 9:
                        if(my_gift_list[i].code != null){
                            $(".tc.tc_box6 .captain").html(ni_name);
                            $(".tc.tc_box6 .result").html("你所在的队伍获得本省第三名!");
                            $(".tc.tc_box6 .gift_code span").html(my_gift_list[i].code);
                            $(".tc.tc_box5").removeClass("active");
                            $(".tc.tc_box6").addClass("active");
                        }else{
                            $(".tc.tc_box6").removeClass("active");
                        }
                        break;
                        case 999:
                        if(my_gift_list[i].is_owner != false){
                            $(".tc.tc_box7 .captain").html(my_gift_list[i].nickname);
                            $(".tc.tc_box5").removeClass("active");
                            $(".tc.tc_box6").removeClass("active");
                            $(".tc.tc_box7").addClass("active");
                        }else{
                            $(".tc.tc_box5").removeClass("active");
                            $(".tc.tc_box6").removeClass("active");
                            $(".tc.tc_box7").removeClass("active");
                            $(".tc_box4 .info_text").html("《创造与魔法》已于2月5日00：00在之前所有登陆过活动页的探险家中，抽取了1人获得“新年锦鲤”称号！");
                            $(".tc_box4 .info_url").html("他就是："+my_gift_list[i].nickname);
                            $(".tc_box4 .info_text2").html("这只“新年锦鲤”将获得2019年推出的，所有全新服装！");
                            $(".tc.tc_box4").addClass("active");
                        }
                        break;
                    }
                    break;
                }
                my_gift_list.splice(0,1);
                console.log(my_gift_list);
            }else{
                $(".tc").removeClass("active");
            }
        }
        $(".close_code").click(function(){
            alertGift();
        })
        //我的奖品
        function my_giftlist(){
            $.ajax({
                'url':my_gift,
                'data':{},
                'type':'POST',
                'dataType':'Json',
                success:function(data){
                    if(data.code==0){
                        var gift_lift="";
                        if(data.data.length>0){
                            for(var i=0;i<data.data.length;i++){
                                gift_lift += '<li>' +
                                '<span class="name_txt align-center-vertical">' + data.data[i].type_name + '</span>' +
                                '<span class="name_code align-center-vertical"  id="page_gold_code' + i + 1 + '">' + data.data[i].code + '</span>'+
                                '<a href="javascript:;" id="tc2_copy_btn' + i + 1 + '" data-clipboard-action="copy" data-clipboard-target="#page_gold_code' + i + 1 + '" class="copy copy' + i + 1 + '">复制</a></li>' 
                            }
                            $(".tc_box8 .price_ul").html(null).append(gift_lift);
                            $(".tc").removeClass("active");
                            $(".tc.tc_box8").addClass("active");
                        }else{
                            alert("您还没有礼包呦~");
                        }
                    }else{
                        alert(data.msg);
                    }
                }
            });
        }
        new Clipboard('.copy0');
        new Clipboard('.copy');
        $("body").on("click",".copy",function(){
           alert("已复制");
        });
        //图片验证码焦点获取显示验证码
        $(".swiper1 .content_box input").focus(function(){
            is_focus++;
            console.log(is_focus);
            if(is_focus==1){
                load_captcha();
            }
        });
        //图片验证码刷新
        $(".co_captcha").click(function(){
            load_captcha();
            is_focus=2;
        });
        // 登录短信验证码
        $(".swiper1 .co_codebtn1").click(function(){
            var user_tel=$(".content_box .co_username").val();
            var tp_yzm=$(".content_box .code1").val();
            var dx_yzm=$(".content_box .code2").val();
            var user_name=$(".content_box .act_name").val();
            if(user_tel == "" || user_tel == undefined) {
                alert("请输入手机号~");
                return;
            }else if(user_tel.length != 11) {
                alert("手机号码不正确哦");
                return;
            }
            if(tp_yzm == "" || tp_yzm == undefined) {
                alert("请输入图片验证码~");
                return;
            }
            $.post(verify_url, {
                  "phone":user_tel,
                  'type': "ios",
                  "captcha": tp_yzm,
                  "smsContent":"您正在进行《创造与魔法》校园联盟活动登录",
                  "cms_csrf": srf,
                }, function(data) {
                  if(data.status == 0) {
                    $(".co_codebtn1").removeClass("active");
                    user_chexk();
                    $(".co_codebtn1").css("pointer-events", "none");
                    page_djs($(".co_codebtn1"), function() {
                      $(".co_codebtn1").css("pointer-events", "auto");
                    });
                  }else{
                    alert(data.msg);
                    load_captcha();
                  }
            },'json');
        })
        //登录请求
        $(".swiper1 .btn_add").click(function(){
            get_login();
        });
        //登陆确认按钮
        $(".btn_tc_sure").click(function(){
            $(this).parent().parent().removeClass("active");
        })
 
        //我的队伍
            $(".my_term_btn").click(function(){
                HLog.event("sm_jinli_my_team");
                $.ajax({
                'url':my_term,
                'data':{},
                'type':'POST',
                'dataType':'Json',
                success:function(data){
                    if(data.code==0){
                        if(data.data != ""){
                            // 有探险队
                            var result="";
                            for(var i = 0;i < data.data.length; i++) {
                                var mtm_li ="";
                                var mtm_li2 =data.data[i].name;
                                if(data.data[i].is_captain == 1){
                                    mtm_li="[队长]";
                                }else{
                                    mtm_li="[队员]";
                                }
                                result +="<li data-id='"+data.data[i].id+"'><p><span class='term_zw'>"+mtm_li+"</span><span class='term_txt'>"+mtm_li2+"</span></p><i></i></li>";
                            }
                            console.log(result);
                            $(".tc_box0 .sel_box ul").html(result);
                            $(".tc").removeClass("active");
                            $(".tc_box0").addClass("active");

                        }else{
                            alert("您还没有加入任何队伍~")
                        }
                    }else{
                        alert(data.msg);
                    }
                }
            });
                
            })
        //建立自己的团队
        $(".tc_box1 .btn_tc_jl").click(function(){
            HLog.event("sm_jinli_creat_team");
            if($(this).hasClass("no_choose")){
                alert("您已创建自己的探险队，请加入其他队伍~")
            }else{
            $(".swiper3 .dy_info span").html(selxx_name1);
            $(".tc").removeClass("active");
            $(".swiper-slide").addClass("hidden");
            HLog.push("sm_jinli_page3_creat_team");
            $(".swiper-slide.swiper3").removeClass("hidden");

            }
        })
        $(".me_btn,.btn_tc_nojl").click(function(){
            HLog.event("sm_jinli_creat_team");
            if($(this).hasClass("no_choose")){
                alert("您已创建自己的探险队，请加入其他队伍~")
            }else{
                $(".swiper3 .dy_info span").html(selxx_name1);
                $(".tc").removeClass("active");
                $(".swiper-slide").addClass("hidden");
                HLog.push("sm_jinli_page3_creat_team");
                $(".swiper-slide.swiper3").removeClass("hidden");
            }
        })
        //创建自己的探险队提交
        $(".swiper3 .btn_ljcj").click(function(){
            HLog.event("sm_jinli_creat_submit");
            var my_cjterm=$(".dy_term input").val();            
            if(my_cjterm == "") {
                alert("请输入您要创建的队名~");
                return;
            }
            $.ajax({
                'url':cj_yterm,
                'data':{
                    'team_name':my_cjterm,
                    'school_name':selxx_name1,
                    "school_lbs_uid":lbs_uid1,
                    "school_lat":sc_lat1,
                    "school_lng":sc_lng1,
                    "city":city,
                    "province":province,
                    "cms_csrf":srf
                },
                'type':'POST',
                'dataType':'Json',
                success:function(data){
                    if(data.code==0){
                        $(".is_nocp").hide();
                        $(".kd_btn1").css("display","block");
                        HLog.event("sm_jinli_creat_submit_su");
                        $(".swiper4 .rq_send1 span").html("0");
                        $(".swiper4 .rq_num span").removeClass("active");
                        $(".swiper4 .my_term").html(my_cjterm+"探险队");
                        $(".swiper5 .my_term").html(my_cjterm+"探险队");
                        team_id=data.data.team_id;
                        $(".btn_tc_nojl").addClass("no_choose");
                        $(".tc_box1 .btn_tc_jl").addClass("no_choose");
                        term_text();
                    }else if(data.code==9003){
                        $(".is_nocp").hide();
                        $(".kd_btn1").css("display","block");
                        HLog.event("sm_jinli_creat_submit_cz");
                        alert("您创建的探险队已存在~");
                    }else{
                        $(".kd_btn1").css("display","none");
                        $(".is_nocp").show();
                        HLog.event("sm_jinli_creat_submit_fa");
                        alert(data.msg);
                    }
                }
            });
           
        });
        //选择战队确认加入
        $(".tc_box2 .btn_tc_jl").click(function(){
            HLog.event("sm_jinli_qrjr");
            var sel_li=$(".tc_box2 .sel_box ul li");
            var sel_team="";
            var sel_teamsc=$(".tc_box2 .school_name").html();
            if($(this).hasClass("share_team")){
                team_id=team_shareid;
            }else{
                if(sel_li.hasClass("active")){
                    team_id=$(".tc_box2 .sel_box ul li.active").data("id");
                    sel_team=$(".tc_box2 .sel_box ul li.active p").html();
                }else{
                    alert("请选择您要加入的战队~");
                    return;
                }
            }
            $.ajax({
                'url':join_term,
                'data':{"team_id":team_id},
                'type':'POST',
                'dataType':'Json',
                success:function(data){
                    if(data.code==0){
                        term_text();
                    }else{
                        alert(data.msg);
                    }
                }
            });
        });
        //查看人气榜
        $(".bdpm_btn").click(function(){
            HLog.event("sm_jinli_bdpm_board");
            phb_list();
        });
        $(".btn_tc_rqpm").click(function(){
            HLog.event("sm_jinli_ck_rq_board");
            if($(".tc_box0 .sel_box ul li").hasClass("active")){
                team_id=$(".tc_box0 .sel_box ul").find("li.active").data("id");
            }else{
                alert("请选择队伍~");
                return;
            }
            term_text();
        })
        //我的礼包
        $(".btn_jl").click(function(){
            HLog.event("sm_jinli_my_gift");
            my_giftlist();
        })
        //选择排名榜
            $(".swiper5 .send_box2").on("click"," .sel_box2 li",function(){
                $(this).addClass("active").siblings().removeClass("active");
                phb_list();
            });
            
            //返回
            $(".btn_return").click(function(){
                share.lineLink="http://h5.yingxiong.com/index/sm/jinli.html?team_id="+share_term_id;
                history.pushState(state, "", "?team_id="+share_term_id);
                wx_o();
                setTimeout(function(){
                HLog.event("sm_jinli_page5_return");
                $(".swiper5").addClass("hidden");
                HLog.push("sm_jinli_page4_team_info");
                $(".swiper4").removeClass("hidden");
                },100);
            })
            $(".swiper3 .return1").click(function(){
                HLog.event("sm_jinli_page3_return");
                $(".tc").removeClass("active");
                $(".swiper3").addClass("hidden");
                $(".swiper2").removeClass("hidden");
                HLog.push("sm_jinli_page2_map");
                share.imgUrl="http:"+imgurl+"images/share4.png";//分享图片
                share.shareTitle="寻找创魔锦鲤，欧气领福利！你也快来吧";//分享文案
                share.lineLink="http://h5.yingxiong.com/index/sm/jinli.html";
                //分享描述
                wx_o();
            })
            $(".swiper4 .return1").click(function(){
                HLog.event("sm_jinli_page4_return");
                $(".tc").removeClass("active");
                $(".swiper4").addClass("hidden");
                $(".swiper2").removeClass("hidden");
                HLog.push("sm_jinli_page2_map");
                share.imgUrl="http:"+imgurl+"images/share4.png";//分享图片
                share.shareTitle="寻找创魔锦鲤，欧气领福利！你也快来吧";//分享文案
                share.lineLink="http://h5.yingxiong.com/index/sm/jinli.html";//分享描述
                wx_o();
            })
            //扩大队伍
            $(".kd_btn").click(function(){
                HLog.event("sm_jinli_kd_team");
                $(".share_bg").removeClass("hidden");
            })
            $(".share_bg").click(function(){
                HLog.event("sm_jinli_share_bg");
                $(".share_bg").addClass("hidden");
            })
            //寻找锦鲤
        $(".btn_find").click(function(){
                $.ajax({
                'url':jinli_ts,
                'data':{},
                'type':'POST',
                'dataType':'Json',
                success:function(data){
                    if(data.code==0){
                        $(".tc_box4 .info_text").html("《创造与魔法》已于2月5日00：00在之前所有登陆过活动页的探险家中，抽取了1人获得“新年锦鲤”称号！");
                        $(".tc_box4 .info_url").html("他就是："+data.data.nickname);
                        $(".tc_box4 .info_text2").html("这只“新年锦鲤”将获得2019年推出的，所有全新服装！");
                        HLog.event("sm_jinli_btn_find");
                        $(".tc").removeClass("active");
                        $(".tc.tc_box4").addClass("active");

                    }else{
                        $(".tc_box4 .info_text").html("创造与魔法》将在2月5日00：00时，在所有登陆过本H5的探险家中，抽取1人，获得“新年锦鲤”称号！");
                        $(".tc_box4 .info_url").html("这只“新年锦鲤”，将获得2019年推出的，所有全新服装！");
                        $(".tc_box4 .info_text2").html("收藏活动页，大年夜记得来看哦！");
                        HLog.event("sm_jinli_btn_find");
                        $(".tc").removeClass("active");
                        $(".tc.tc_box4").addClass("active");
                    }
                }
            })
        })
            //查看全部成员
            $(".look_all").click(function(){
                term_text();
                HLog.event("sm_jinli_look_all");
                $(".swiper4 .send_box2 .cy_namelist .cy_name ul li").addClass("active");
                $(".swiper4 .send_box2 .cy_namelist .cy_name").css("height","auto");
                $(".swiper4 .send_box2 .cy_namelist").css("height","auto");
            })
            //锦鲤提交按钮
            $(".btn_tc_jlgift").click(function(){
                HLog.event("sm_jinli_btn_tc_jlgift");
            var user_name2=$(".user_addinfo .co_username").val();
            var server_id=$(".user_addinfo .co_qufu").val();
            var role_id=$(".user_addinfo .co_hallid").val();
            var phone=$(".user_addinfo .co_tel").val();
            var qq=$(".user_addinfo .co_qq").val();
            var wechat=$(".user_addinfo .co_weixin").val();
            var s_phone=$(".user_addinfo .co_jjtel").val();
            if(phone == "" || phone == undefined) {
                alert("请输入手机号~");
                return;
            }else if(phone.length != 11){
                 alert("手机号码不正确哦");
                return;
            }
            if(wechat == "" || wechat == undefined) {
                alert("请输入您的微信~");
                return;
            }
            if(qq == "" || qq == undefined) {
                alert("请输入您的QQ~");
                return;
            }
            $.ajax({
                'url':jl_info,
                'data':{'name':user_name2,'server_id':server_id,"role_id":role_id,"phone":phone,"qq":qq,"wechat":wechat,"s_phone":s_phone,"cms_csrf":srf},
                'type':'POST',
                'dataType':'Json',
                success:function(data){
                    if(data.code==0){
                        $(".tc").removeClass("active");
                        alert("提交成功~");
                    }else{
                        alert(data.msg);
                    }
                }
            });

            })
});

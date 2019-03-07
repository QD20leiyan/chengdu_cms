/*wlo:Cflower*/
var logg = null;
var dialog; if(!dialog) dialog={};
var flagPC = true;
dialog={
    //关闭  document.location.reload()
    closeDiv:function(){
        // 关闭特点

        $("#alertInfo,.pop").stop(true,true).animate({
            "top":"-100%",
            "opacity":"0"
        },"fast",function(){
            $("#maskLayer,#alertInfo").remove().hide();
            $('.pop').hide();
            $('.wrap').removeClass('row');
        });
    },
    //
    maskLayer:function(){
        $("#maskLayer,#alertInfo").remove();
        var maskLayer="<div id='maskLayer'></div>";
        var alertInfo="<div id='alertInfo'><span class='close'>关闭</span></div>";
        $("body").append(maskLayer,alertInfo);
        $('.wrap').addClass('row');
        $("#maskLayer").height($(document).height()).show();
    },
    //显示提示信息框
    showInfo:function(alertHtml){
        dialog.maskLayer();
        var _winH=$(window).height();             //﹣﹣﹣﹣﹣﹣﹣﹣﹣﹣﹣┐
        var _scrollTop=$(document).scrollTop();   //　　　　　　　　　　　      ├→
        $("#alertInfo").append(alertHtml).show(); //﹣﹣﹣﹣﹣﹣﹣﹣﹣﹣﹣┘
        // $('.pop').show();
        var _thisDomWidth=$("#alertInfo").outerWidth();
        var _thisDomHeight=$("#alertInfo").outerHeight();
        var topD=parseInt(_scrollTop+(_winH-_thisDomHeight)/2);
        var mL=parseInt(_thisDomWidth/2);
        if(_thisDomHeight>=_winH){
            topD=_scrollTop;
            if(_scrollTop+_thisDomHeight>=$(document).height()){
                topD=$(document).height()-_thisDomHeight;
            };
            $("#alertInfo").css("position","absolute");
        }else{
            topD=(_winH-_thisDomHeight)/2;
            $("#alertInfo").css("position","fixed");
        };
        $("#alertInfo").css({
            "margin-left":"-"+mL+"px"
        }).stop(true,true).animate({
            "top":topD+"px",
            "margin-left":"-"+mL+"px",
            "opacity":"1"
        },"fast");
        //console.log("点击弹层时窗口的高度："+_winH);
    },
    //改变窗口大小时改变弹出层的位置
    alertInfoPo:function(){
        var _winHResize=$(window).height();
        var _scrollTopResize=$(document).scrollTop();
        var _thisDomWidthResize=$("#alertInfo").outerWidth();
        var _thisDomHeightResize=$("#alertInfo").outerHeight();
        var topResize=parseInt(_scrollTopResize+(_winHResize-_thisDomHeightResize)/2);
        if(topResize>=$("body").height()-_thisDomHeightResize){
            _scrollTopResize=$("body").height()-_thisDomHeightResize;
            topResize=_scrollTopResize-(_winHResize-_thisDomHeightResize)/2;
        };
        if(_thisDomHeightResize>=_winHResize){
            topResize=_scrollTopResize;
            if(_scrollTopResize+_thisDomHeightResize>=$(document).height()){
                topResize=$(document).height()-_thisDomHeightResize;
            };
            $("#alertInfo").css("position","absolute");
        }else{
            topResize=(_winHResize-_thisDomHeightResize)/2;
            $("#alertInfo").css("position","fixed");
        };
        $("html,body").stop(true,true).animate({scrollTop:_scrollTopResize});
        $("#alertInfo").stop(true,true).animate({
            "top":topResize+"px",
            "margin-left":"-"+(_thisDomWidthResize/2)+"px"
        })
        //console.log("改变大小时窗口的高度："+_winHResize);
        $("#maskLayer").height($("body").height());
    },
    //提示弹层
    alertTips:function(msg,btnMsg,func,flag){//msg：提示内容, btnMsg：按钮文字,func：为“确定”按钮动作处理函数,flag：双按钮标识，”d“为双按钮（”确定“和”取消“,“取消”时的按钮动作是关闭窗口），”s“为单按钮
        var btn="<div class='infoBtn msgBtn'><a class='click-btn click-btnNew-3' href='javascript:"+func+";'>"+btnMsg+"</a></div>";
        if(flag=="d") btn="<div class='infoBtn dd'><a class='click-btn ' href='javascript:"+func+";'>"+btnMsg+"</a><a class='click-btn c' href='javascript:dialog.closeDiv();'>取 消</a></div>";
        dialog.showInfo("<div class='tsInfoTwo'>"
            +"<a  href='javascript:;' class='close'></a>"
            +" <div class='p'>"+msg+"</div>"
            +btn+"</div>");
    },
    //登录弹层
    alertLog:function(logTitle){//func：为“登录”按钮动作处理函数
        dialog.showInfo("<div class='logInfo'>"
            +" <h4><span>"+logTitle+"</span></h4>"
            +" <ul class='logUl clearfloat'>"
            +"  <li><label for='zH'>账　号：</label><input type='text' name='zH' id='zH' value=''></li>"
            +"  <li><label for='mM'>密　码：</label><input type='password' name='mM' id='mM' value=''></li>"
            +"  <li><label for=''>大　区：</label><div class='selBox'>"
            +"   <i>请选择大区</i><em><b></b></em>"
            +"   <div class='selC'>"
            +"    <a href='javascript:;' value='z_0'>请选择大区</a>"
            +"    <a href='javascript:;' value='z_1'>电信（南区）</a>"
            +"    <a href='javascript:;' value='z_2'>联通（北区）</a>"
            +"   </div><input type='hidden' class='sel-ed' id='zone' value=''>"
            +"  </div></li>"
            +"  <li id='vode_area' class='yzM'><label for='yzM'>验证码：</label><input type='text' name='yzM' id='yzM' maxlength='4' value=''><img  id='verifyImg' onclick='changeImg()'></li>"
            +"  <li class='tsli' id='logTs'><label for=''></label><span id='loginmsg'></span></li>"
            +" </ul>"
            +" <div class='infoBtn'><a class='click-btn' href='javascript:login();'>登 录</a></div>"
            +"</div>");
        changeImg();
//      $.divselect(".selBox",".sel-ed");
    },
    //提示弹层
    alertMsg:function(msgTitle,msg,func,flag){//msgTitle：提示标题,msg：提示内容,func：为“确定”按钮动作处理函数,flag：双按钮标识，”d“为双按钮（”确定“和”取消“,“取消”时的按钮动作是关闭窗口），”s“为单按钮（只有”确定“）
        var btn="<div class='infoBtn'><a class='click-btn' href='javascript:"+func+";'>确 定</a></div>";
        if(flag=="d") btn="<div class='infoBtn dd'><a class='click-btn' href='javascript:"+func+";'>确 定</a><a class='click-btn c' href='javascript:dialog.closeDiv();'>取 消</a></div>";
        dialog.showInfo("<div class='tsInfo'>"
            +" <h4><span>"+msgTitle+"</span></h4>"
            +" <div class='p'>"+msg+"</div>"
            +btn+"</div>");
    },
    //个人动态
    alertItory:function(){
        var log = "";
        if(logg.userLogs.length>0){
            for ( var int = 0; int < logg.userLogs.length; int++) {
                log = log + "<tr><td>"+ logg.userLogs[int].insert_date + "</td> <td>" + logg.userLogs[int].remark + "</td></tr>";
            }
        }
        dialog.showInfo("<div class='userInfo'>"
                +" <h4><span>个人动态</span></h4>"
                +" <table>"

                +" </table>"
                +" <div class='etable mCustomScrollbar _mCS_1' >"
                +" <table>"
                +log
                +" </table>"
                +" </div>"
                +"</div>")
                 $(".etable").mCustomScrollbar();
    },
    //视频弹窗
    alertVideo:function(videoUrl){
        dialog.showInfo(
            "<div class='pop_warp'>"
                    +"<div class='before'>"
                        // +"<embed src='"+videoUrl+"' type='application/x-shockwave-flash' allowscriptaccess='always' allowfullscreen='true' wmode='opaque'>"
                        +"<iframe border='0' marginwidth='0' framespacing='0' marginheight='0' src='"+videoUrl+"' frameborder='0' noresize='scrolling='no' width='100%' height='100%' vspale='0' id='iframe' name='iframe' allowfullscreen></iframe>"
                    +"</div>"
            +"</div>")
    },
    alertBind:function(msgTitle,msg,func,flag){//msgTitle：提示标题,msg：提示内容,func：为“确定”按钮动作处理函数,flag：双按钮标识，”d“为双按钮（”确定“和”取消“,“取消”时的按钮动作是关闭窗口），”s“为单按钮（只有”确定“）

        var btn = '<a href="javascript:'+ func +';" class="btn">立刻绑定</a>';
        if(flag=="d") btn='<a href="javascript:'+ func +';" class="btn">立刻绑定</a>'+'<a href="javascript:;'+ func +'" class="btn r">再想想</a>';
        dialog.showInfo(
                '<div class="alertbind">'
                    +'<div class="alertcont">'
                    +   '<ul>'
                    + msg+'<div class="endbtn">'+btn+'</div>'
                    +   '</ul>'
                    +'</div>'
                +'</div>'
            );
    },
    alertDL:function(btntxt,msg,fuc,fuc2,flag){
        var btn = '<a href="javascript:'+ fuc +';" class="btn pop_btn2">'+btntxt+'</a>';
        if(flag=="d") btn='<a href="javascript:'+ fuc +';" class="btn pop_btn1">やめる</a>'+'<a href="javascript:'+ fuc2 +';" class="btn pop_btn2">確定する</a>';
        if (flag=="0") {btn=''}
        dialog.showInfo(
            '<div class="popMinRe">'
            +    '<a href="javascript:;" class="btn close"> 关闭 </a>'
            +    '<div class="pcent">'
                    +msg
            +        '<div class="endbtn">'
                    +btn
            +        '</div>'
            +    '</div>'
            +'</div>'
        );
        // 移除第一层创建的 close 按钮
        $('#alertInfo').find('span.close').remove()

    }
};
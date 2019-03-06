var me_url='/h5/cd/ajax-my-code.html';//获取当前用户中奖记录
var lottery_url='/h5/cd/ajax-draw.html';//抽奖

$(function(){
    var rotateTimeOut = function (){
        $('.pointer').rotate({
            angle:0,
            animateTo:2160,
            duration:8000,
            step:function(angle){
                angle=parseInt(angle)%360;
                if(45<angle&&angle<=135){
                    $(".wheelcanvas").removeClass("left").addClass("top");
                }else if(135<angle&&angle<=225){
                    $(".wheelcanvas").removeClass("top").addClass("right");
                }else if(225<angle&&angle<=315){
                    $(".wheelcanvas").removeClass("right").addClass("bottom");
                }else{
                    $(".wheelcanvas").removeClass("bottom").addClass("left");
                }
            },
            callback:function (){
                alert('网络超时，请检查您的网络设置！');
            }
        });
    };
    //抽奖
    var rotateconf={
        bRotate:false,
        gifts:["白银礼包","钻石礼包","iPhone X","黄金礼包"]
    }
    //旋转转盘 item:奖品位置; txt：提示语;
    var rotateFn = function (item, txt,code){
        var angles = item * (360 / 4);
        if(angles<270){
            angles = 270 - angles;
        }else{
            angles = 360 - angles + 270;
        }
        $('.pointer').stopRotate();
        $('.pointer').rotate({
            angle:0,
            animateTo:angles+1800,
            duration:8000,
            step:function(angle){
                angle=parseInt(angle)%360;
                if(45<angle&&angle<=135){
                    $(".wheelcanvas").removeClass("left").addClass("top");
                }else if(135<angle&&angle<=225){
                    $(".wheelcanvas").removeClass("top").addClass("right");
                }else if(225<angle&&angle<=315){
                    $(".wheelcanvas").removeClass("right").addClass("bottom");
                }else{
                    $(".wheelcanvas").removeClass("bottom").addClass("left");
                }
            },
            callback:function (){
                $(".co_tips_ward").removeClass("hidden");
                $(".gift_name").text(txt);
                $(".code_num").text(code);
                rotateconf.bRotate = !rotateconf.bRotate;
            }
        });
    };
    $('.pointer_txt').click(function (){
        if(rotateconf.bRotate) return;
        rotateconf.bRotate = !rotateconf.bRotate;
        rotateTimeOut();
        $.ajax({
            'url':lottery_url,
            'data':{},
            'type':'POST',
            'dataType':'Json',
            success:function(data){
                if(data.status==0){
                    var item=0;
                    if(data.name=="白银"){
                        item=0;
                    }else if(data.name=="钻石"){
                        item=1;
                    }else if(data.name=="黄金"){
                        item=3;
                    }
                    var code=data.msg;
                    rotateFn(item, rotateconf.gifts[item],code);
                }else{
                    rotateconf.bRotate = !rotateconf.bRotate;
                    $('.pointer').stopRotate();
                    alert(data.msg);
                }
            },
            error:function(){
                rotateconf.bRotate = !rotateconf.bRotate;
                $('.pointer').stopRotate();
            }
        });
        ////获取随机数模拟抽奖结果(奖品个数范围内)
        //var item = Math.floor(Math.random()*4);
    });

    //弹窗关闭
    $(".co_tips_close").click(function(){
        $(".co_tips_ward").addClass("hidden");
        $(".co_tips_record").addClass("hidden");
    });

    //复制
    new Clipboard('.copy');
    $(".copy").click(function() {
        alert("已复制");
    });

    //我的礼包
    $(".get_btn").click(function(){
        //获取当前用户中奖记录
        $.ajax({
            'url':me_url,
            'data':{},
            'type':'GET',
            'dataType':'Json',
            success:function(data){
                if(data.status==0&& data.code.length>0){
                    $('.table_list').empty();
                    var result = '';
                    for(var i = 0; i < data.code.length; i++) {
                        result += "<p class='table_info'><span>"+data.code[i].name+"</span><span class='table_code'>"+data.code[i].code+"</span></p>";
                    }
                    $('.table_list').append(result);
                    $(".co_tips_record").removeClass("hidden");
                }else{
                    alert("您还没有中奖记录哦~");
                }
            }
        });
    });
});

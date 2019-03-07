var  h5_wx=$(".h5_wx").html();
var  h5_data=$(".h5_data").html();
var get_url='/ca/lenovo/ajax-auto-data.html'+h5_jk_url;//获取当前用户信息
var lottery_url='/ca/lenovo/ajax-draw.html'+h5_jk_url;//抽奖
var add_url='/ca/lenovo/ajax-address'+h5_jk_url;//保存收货地址
var me_url='/ca/lenovo/ajax-my-code'+h5_jk_url;//获取当前用户礼包
var info=$(".i_main").attr("data-info");
var h5_id=$(".i_main").attr("data-id");
var draw_num=0;
var srf = $('meta[name="csrf-token"]').attr('content');
//错误提示显示
function showErr(index, text) {
    $(".co_error").eq(index).addClass("co_err_show").html(text);
    $(".err").eq(index).addClass("err_show").html(text);
}
//错误提示隐藏
function hideErr(index) {
    $(".co_error").eq(index).removeClass("co_err_show");
}
$(function(){
    //获取个人信息
    $.ajax({
        'url':get_url,
        'data':{
            'info':info,'h5_id':h5_id,"cms_csrf":srf
        },
        'type':'POST',
        'dataType':'Json',
        success:function(data){
            if(data.status==0){
                draw_num=data.draw_num;
                console.log(draw_num);
            }
        }
        ,error:function(){
            alert("网络请求失败，请重新刷新页面");
        }
    });
    //弹窗关闭
    $(".co_tips_close,.co_tips_surebtn").click(function(){
        $(".co_tips").addClass("hidden");
    });
    //地址弹框显示
    $(".co_tips_addbtn").click(function(){
        $(".co_tips").addClass("hidden");
        $(".co_tips_addr").removeClass("hidden");
        $("body,html").addClass("no_auto");
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
                if(data.status==0&& data.msg.length>0){
                    $('.table_list').empty();
                    var result = '';
                    for(var i = 0; i < data.msg.length; i++) {
                        result += "<p class='table_info'><span>"+data.msg[i].name+"</span><span class='table_code'>"+data.msg[i].code+"</span></p>";
                    }
                    $('.table_list').append(result);
                    $(".co_tips_record").removeClass("hidden");
                }else{
                    alert("您还没有中奖记录哦~");
                }
            }
        });
    });
    //地址填写请求
    $(".co_tips_addsurebtn").click(function(){
        var my_name = $(".u_name").val();
        var my_yb=$('.u_yb').val();
        var my_tel = $(".u_tel").val();
        var my_add=$('.u_madd').val();
        if(!my_name) {
            showErr(0, "收获姓名不能为空哦");
            return;
        }hideErr(0);
        if(!my_yb) {
            showErr(0, "收获邮编不能为空哦");
            return;
        }hideErr(0);
        if(!my_tel) {
            showErr(1, "手机号码不能为空哦");
            return;
        }else if(my_tel.length != 11){
            showErr(1, "手机号码不正确哦");
            return;
        }hideErr(1);
        if(!my_add) {
            showErr(2, "收件人地址不能为空哦");
            return;
        }hideErr(2);
        $.ajax({
            'url':add_url,
            'data':{'name':my_name,'code':my_yb,'address':my_add,'tel':my_tel,"cms_csrf":srf },
            'type':'POST',
            'dataType':'Json',
            success:function(data){
                if(data.status==0){
                    alert("保存成功");
                    $(".co_tips_addr").addClass("hidden");
                    $("body,html").removeClass("no_auto");
                    $(".u_name").val(my_name);
                    $(".u_yb").val(my_yb);
                    $(".u_tel").val(my_tel);
                    $(".u_madd").val(my_add);
                }else{
                    alert(data.msg);
                }
            }
        });
    });
    //抽奖
    var count=0;
    var rotateTimeOut = function (){
        $('.wheelcanvas').rotate({
            angle:0,
            animateTo:2160,
            duration:8000,
            step:function(angle){
                if(++count==12){
                    count=0;
                    $(".lottery_out_box").toggleClass("active");
                }
            },
            callback:function (){
                alert('网络超时，请检查您的网络设置！');
            }
        });
    };
    var rotateconf={
        bRotate:false,
        gifts:["火神燃烧弹（7天）","感谢参与","联想手机","三道杠（永久）","堕落护士（180天）","暴烈骑士（7天）","血狐猎弓（7天）","平底锅（7天）"]
    }
    //旋转转盘 item:奖品位置; txt：提示语;
    var rotateFn = function (item, txt,code){
        var angles = item * (360 / 8);
        console.log(angles);
        $('.wheelcanvas').stopRotate();
        $('.wheelcanvas').rotate({
            angle:0,
            animateTo:angles+1800,
            duration:8000,
            step:function(angle){
                if(++count==12){
                    count=0;
                    $(".lottery_out_box").toggleClass("active");
                }
            },
            callback:function (){
                if(item==1){
                    $(".co_tips_success").removeClass("hidden");
                    $(".co_tips.co_tips_success .tips_txt").addClass("hidden");
                    $(" .co_tips.co_tips_success .success").text("谢谢参与！");
                }else{
                    $(".co_tips_ward").removeClass("hidden");
                    $(".gift_name").text(txt);
                    $(".code_num").text(code);
                }
                rotateconf.bRotate = !rotateconf.bRotate;
            }
        });
    };
    $('.pointer_txt').click(function (){
        if(draw_num>0){
            if(rotateconf.bRotate) return;
            rotateconf.bRotate = !rotateconf.bRotate;
            rotateTimeOut();
//            //模拟ajax
//            setTimeout(function(){
//                //获取随机数模拟抽奖结果(奖品个数范围内)
//                var item = Math.floor(Math.random()*8);
//                rotateFn(item, rotateconf.gifts[item],"ABDE23JGGEI");
//            },1000);
            $.ajax({
                'url':lottery_url,
                'data':{},
                'type':'POST',
                'dataType':'Json',
                success:function(data){
                    if(data.status==0){
                        draw_num=data.draw_num;
                        if(data.msg.is_shiwu==0){
                            //非实物
                            $(".co_tips_ward .sw_ts,.co_tips_ward .co_tips_addbtn").addClass("hidden");
                            $(".co_tips_ward .code_num,.co_tips_ward .co_tips_copybtn").removeClass("hidden");
                        }else{
                            //非实物
                            $(".co_tips_ward .sw_ts,.co_tips_ward .co_tips_addbtn").removeClass("hidden");
                            $(".co_tips_ward .code_num,.co_tips_ward .co_tips_copybtn").addClass("hidden");
                        }
                        var item=0;
                        if(data.msg.gift_id==313){//火神燃烧弹（7天）
                            item=0;
                        }else if(data.msg.gift_id==314){//平底锅（7天）
                            item=7;
                        }else if(data.msg.gift_id==315){//血狐猎弓（7天）
                            item=6;
                        }else if(data.msg.gift_id==316){//暴烈骑士（7天）
                            item=5;
                        }else if(data.msg.gift_id==317){//堕落护士（180天）
                            item=4;
                        }else if(data.msg.gift_id==318){//三道杠（永久）
                            item=3;
                        }else if(data.msg.gift_id==319){//联想手机
                            item=2;
                        }else if(data.msg.gift_id==320){//感谢参与
                            item=1;
                        }
                        var code=data.msg.msg;
                        $(".copy").attr("data-clipboard-text",code);
                        rotateFn(item, rotateconf.gifts[item],code);
                    }else{
                        rotateconf.bRotate = !rotateconf.bRotate;
                        $('.wheelcanvas').stopRotate();
                        alert(data.msg);
                    }
                },
                error:function(){
                    rotateconf.bRotate = !rotateconf.bRotate;
                    $('.wheelcanvas').stopRotate();
                }
            });
        }else{
            $(".co_tips_success").removeClass("hidden");
            $(".co_tips.co_tips_success .tips_txt").addClass("hidden");
            $(" .co_tips.co_tips_success .success").text("抽奖次数已达上限哦！");
        }
    });
});
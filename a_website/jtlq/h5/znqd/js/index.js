var order_url ='/h5/jtlq/login.html';
//登入请求
$(".inter").click(function(){
    var username = $(".username").val();
    var serverId = $(".service").attr("data-id");
    if(username == "" || username == undefined) {
        alert("角色名稱不能為空");
        return;
    }
    if(serverId == "" || serverId == undefined) {
        alert("伺服器不能為空");
        return;
    }
    $(".js_load").show();
    $(".js_load p").html("正在加載...");
    var srf = $('meta[name="csrf-token"]').attr('content');
    $.post(order_url,{ "username":username,"serverId":serverId,"cms_csrf":srf },function(data){
        if(data.status == 0){
            $(".js_load").hide();
            $(".login").addClass("hidden");
            //全服数字增长
            var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
            $('.q_count1').animateNumber(
                {number: 125767356,numberStep: comma_separator_number_step}
            );
            $('.q_count2').animateNumber(
                {number: 2756339122,numberStep: comma_separator_number_step}
            );
            $('.q_count3').animateNumber(
                {number: 5712813,numberStep: comma_separator_number_step}
            );
            $('.q_count4').animateNumber(
                {number: 61}
            );
            $('.q_count5').animateNumber(
                {number:46}
            );
            //全服数据
            var game_url=$(".wrap").attr("data-url");
            var maxId=data.data.info.max;
            $(".userhead img").attr("src",""+game_url+"images/lg_img/"+maxId+".png");
            //个人数据第一页
            var year=data.data.year;
            var month=data.data.month;
            var day=data.data.day;
            var days=data.data.info.day;
            var fightnum=data.data.fightnum;
            var assess1=data.data.info.assess1;
            $(".year").html(year);
            $(".month").html(month);
            $(".day").html(day);
            $(".days").html(days);
            $(".fightnum").html(fightnum);
            $(".assess1").html(assess1);
            //个人数据第二页
            var lad_name=data.data.info.lad_name;
            var lad_img=data.data.info.lad_img;
            var point=data.data.info.point;
            var rebound=data.data.info.rebound;
            var assists=data.data.info.assists;
            var steal=data.data.info.steal;
            var block=data.data.info.block;
            var mvp=data.data.info.mvp;
            var assess2_key=data.data.info.assess2_key;
            var assess2_value=data.data.info.assess2_value;
            $(".lad_name").html(lad_name);
            $(".lad_img").attr("src",""+game_url+"images/dw_img/"+lad_img+".png");
            $(".point").html(point);
            $(".rebound").html(rebound);
            $(".assists").html(assists);
            $(".steal").html(steal);
            $(".block").html(block);
            $(".mvp").html(mvp);
            $(".assess2_key").html(assess2_key);
            $(".assess2_value").html(assess2_value);
            //个人数据第三页
            var playernum=data.data.playernum;
            var equipnum=data.data.equipnum;
            var maxId=data.data.info.max;
            var assess3_key=data.data.info.assess3_key;
            var assess3_value=data.data.info.assess3_value;
            $(".playernum").html(playernum);
            $(".equipnum").html(equipnum);
            $(".baller img").attr("src",""+game_url+"images/sc_img/"+maxId+".png");
            $(".assess3_key").html(assess3_key);
            $(".assess3_value").html(assess3_value);
            $(".peo img").attr("src",""+game_url+"images/peo_img/"+maxId+".png");
            //分享页
            var name=data.data.name;
            var zone=data.data.zone;
            var assess4=data.data.info.assess4;
            var skill=data.data.info.skill;
            $(".name").html(name);
            if(zone==1){
                $(".qf_id").html("熱血街頭");
            }else if(zone==2){
                $(".qf_id").html("嘻哈禁區");
            }else if(zone==3){
                $(".qf_id").html("自由之翼");
            }else if(zone==4){
                $(".qf_id").html("夢想領域");
            }else if(zone==5){
                $(".qf_id").html("上帝之手");
            }
            $(".assess4").html(assess4);
            d('myCanvas',eval("("+skill+")"));
            //alert(data.msg);
        }else{
            $(".js_load").hide();
            $(".tips").removeClass("hidden");
            //alert(data.msg);
        }
    }, 'json');
    //$(".login").addClass("hidden");
});

//点击头像回到登录页面
$(".userhead").click(function(){
    location.reload()
    // $(".login").removeClass("hidden");
});

//服务器下拉框
$(".sign_list h1").click(function () {
    $(".sign_list>div").toggleClass("show");
});
$(".sign_list ul li").click(function () {
    var html = $(this).find("span").html();
    var serverId= $(this).find("span").attr("data-id");
    $(this).parent().parent().parent().removeClass("show");
    $(".sign_list h1").attr("checked", "true");
    $(".service").html(html);
    $(".service").attr("data-id",serverId);
});

//错误弹框关闭
$(".l_close").click(function(){
    $(".tips").addClass("hidden");
});

//      //滚动条初始化
//      $(".li_scroll").mCustomScrollbar({
//          axis:"y"
//      });

//五边形canvas绘制
function d(id,param){
    var canvas=document.getElementById(id);
    var w=canvas.width;
    var h=canvas.height;
    var cx=w/2;
    var cy=w/2;
    var ctx=canvas.getContext('2d');
    ctx.clearRect(0,0,w,h);
    //绘制整个正五边形区域
    //开始一个新的绘制路径
    var outarr=[{x:cx,y:0+2},
        {x:cx+cx*Math.sin(2*Math.PI/360*72),y:cy-cy*Math.cos(2*Math.PI/360*72)+2},
        {x:cx+cx*Math.sin(2*Math.PI/360*36),y:cy+cy*Math.cos(2*Math.PI/360*36)+2},
        {x:cx-cx*Math.sin(2*Math.PI/360*36),y:cy+cy*Math.cos(2*Math.PI/360*36)+2},
        {x:cx-cx*Math.sin(2*Math.PI/360*72),y:cy-cy*Math.cos(2*Math.PI/360*72)+2}];
    ctx.beginPath();
    for(var i=0 in outarr){
        i==0?ctx.moveTo(outarr[i].x,outarr[i].y):ctx.lineTo(outarr[i].x,outarr[i].y);
    }
    ctx.closePath();
    //设置要填充的颜色
    ctx.fillStyle='#fff';
    //添加外框
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#363636';
    //最后，填充颜色
    ctx.fill();
    ctx.stroke();

    //中间线
    //开始一个新的绘制路径
    for(var i=0 in outarr){
        ctx.beginPath();
        ctx.moveTo(cx,cy+2);
        ctx.lineTo(outarr[i].x,outarr[i].y);
        ctx.lineWidth=1;
        ctx.strokeStyle='#808080';
        ctx.stroke();
    }

    //绘制中间五边形
    var marr=[{x:cx,y:cy-cy*0.6+2},
        {x:cx+cx*Math.sin(2*Math.PI/360*72)*0.6,y:cy-cy*Math.cos(2*Math.PI/360*72)*0.6+2},
        {x:cx+cx*Math.sin(2*Math.PI/360*36)*0.6,y:cy+cy*Math.cos(2*Math.PI/360*36)*0.6+2},
        {x:cx-cx*Math.sin(2*Math.PI/360*36)*0.6,y:cy+cy*Math.cos(2*Math.PI/360*36)*0.6+2},
        {x:cx-cx*Math.sin(2*Math.PI/360*72)*0.6,y:cy-cy*Math.cos(2*Math.PI/360*72)*0.6+2}];
    ctx.beginPath();
    for(var i=0 in marr){
        i==0?ctx.moveTo(marr[i].x,marr[i].y):ctx.lineTo(marr[i].x,marr[i].y);
    }
    ctx.closePath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#363636';
    ctx.stroke();

    var inarr=[{x:cx,y:cy-cy*(param[0]||0)+2},
        {x:cx+cx*Math.sin(2*Math.PI/360*72)*(param[1]||0),y:cy-cy*Math.cos(2*Math.PI/360*72)*(param[1]||0)+2},
        {x:cx+cx*Math.sin(2*Math.PI/360*36)*(param[2]||0),y:cy+cy*Math.cos(2*Math.PI/360*36)*(param[2]||0)+2},
        {x:cx-cx*Math.sin(2*Math.PI/360*36)*(param[3]||0),y:cy+cy*Math.cos(2*Math.PI/360*36)*(param[3]||0)+2},
        {x:cx-cx*Math.sin(2*Math.PI/360*72)*(param[4]||0),y:cy-cy*Math.cos(2*Math.PI/360*72)*(param[4]||0)+2}];

    //绘制中间要显示的区域
    ctx.beginPath();
    for(var i=0 in inarr){
        i==0?ctx.moveTo(inarr[i].x,inarr[i].y):ctx.lineTo(inarr[i].x,inarr[i].y);
    }
    ctx.closePath();
    ctx.fillStyle='rgba(255, 134, 0, .7)';
    ctx.fill();
    //添加外框
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#FF7C00';
    ctx.stroke();

    //绘制中间顶点的圆
    for(var i=0 in inarr){
        ctx.beginPath();
//            i==0?ctx.moveTo(inarr[i].x,inarr[i].y):ctx.lineTo(inarr[i].x,inarr[i].y);
        ctx.arc(inarr[i].x,inarr[i].y,2,0,2*Math.PI);

        //设置要填充的颜色
        ctx.fillStyle='#FFEBDA';
        //添加外框
        ctx.lineWidth = 1;
        ctx.strokeStyle='#FF7C00';
        //最后，填充颜色
        ctx.fill();
        ctx.stroke();
    }
}
// [0.1,0.5,0.6,0.7,0.3] 得分，籃板，助攻，抄截，火鍋

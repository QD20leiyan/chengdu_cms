$(function(){
    //滚动条初始化
    $(".data_page .pa_choose").mCustomScrollbar({
        axis:"y"
    });
    //技能点击显示初始
    //$(".section3-feature-ul>li").find(".right>div:eq(0)").removeClass("hide");
    $(".section3-feature-ul>li").find(".left>.s_list .list_img:eq(0)").trigger("click");
    //列表符文文案获取初始化
    fwcl();
    //文案分享后获取分享前被选中的符文
    var param=location.search.substring(1).split("&");
    for(var i in param){
        if(param[i]&&param[i].split("=")[0]=="ids"){
            var ids=param[i].split("=")[1]||"";
            var idArr=ids.split(",");
            for(var j in idArr){
                $(".data_page .pa_choose .box[data-id='"+idArr[j]+"']").trigger("click");
            }
        }
    }
    //分享符文
    var de_url=$(".share-btn").attr("data-url");
    $(".data_page .pa_top .share-btn").zclip({
            path: de_url+"3.0/js/ZeroClipboard.swf",
            copy: function(){
                var arrId=[];
                $(".data_page .pa_top .left>span[data-id]").each(function(i,n){
                    if($(n).attr("data-id")){
                        arrId.push($(n).attr("data-id"));
                    }
                });
                return location.href.split("?")[0]+"?ids="+arrId.join(",");
            },
            afterCopy: function(){//复制成功
                alert("复制成功,请粘贴到浏览器地址栏访问！");
            }
        });
});


//技能hover划出内容
$(".section3-feature-ul li a").hover(function() {
    $(this).parent("li").addClass("active").siblings().removeClass("active");
});
//技能点击显示
$(".section3-feature-ul .s_list>.list_img").click(function() {
    var index=$(this).attr("data-index");
    $(this).closest(".left").find(".s_list .list_img").removeClass("active");
    $(this).addClass("active");
    $(this).closest(".info").find(".right>div").addClass("hide");
    $(this).closest(".info").find(".right>div[data-index='"+index+"']").removeClass("hide");
});


//下拉选择框
$(".data_peo .sign_list ul li").click(function() {
    var html = $(this).find("span").html();
    var type_name = $(this).parent().parent().find(".type_name");
    $(".data_peo .sign_list ul li").removeClass("active");
    $(this).addClass("active");
    type_name.text(html).css({
        color: "#AE3434"
    });
    type_name.attr("data-value",$(this).attr("data-value"));//设置data-value值

    //type值获取
    var typeVal="";
    $(".data_peo .sign_list .type_name").each(function(i,n){
        typeVal+=$(n).attr("data-value")||"1";
    });
    //console.log(typeVal);
    var arm_url="/article/army";
    $.get(arm_url,{"type":typeVal},function(data){
        $(".data_peo .da_list>.list_box").remove();
        if(data.data.length>0){
            $(".da_no").addClass("hide");
            $(".da_pages").html(data.page);
            for(var i in data.data){
                var html="<div class='list_box'>"+
                    "<a href='"+data.data[i].linkUrl+"' data-id='"+data.data[i].id+"'><p class='list_img'><span><img src='"+data.data[i].thumb+"'></span></p></a>"+
                    "<p class='list_name'>"+data.data[i].title+"</p></div>";
                $(".data_peo .da_list>.da_pages").before(html);
            }
        }else{
            $(".da_pages").html("");
            $(".da_no").removeClass("hide");
        }
    }, 'json');
});
//下拉选择框hover
$(".sign_list").hover(function(){
    //移入
    $(this).find("ul").slideDown(200);
},function(){
    //移出
    $(this).find(".type_name").removeAttr("style");
    $(this).find("ul").slideUp(200);
});


//详情页面图片集hover
$(".data_detail .de_top .de_right>div").hover(function() {
    $(this).addClass("active").siblings().removeClass("active");
});
//详情页面更多显示
if($(".data_detail .de_info .module4 .con p:first").height()<236){
    $(".data_detail .de_info .module4 .con>span").hide();
    $(".data_detail .de_info .module4 .con p:first").css("marginBottom","20px");
}
//详情页面点击更多
$(".data_detail .de_info .module4 .con>span>span").click(function(){
    var con=$(this).closest(".con");
    if($(this).hasClass("more")){
        //展开
        con.height("auto");
        $(this).removeClass("more");
        $(this).find("i").addClass("close");
        $(this).find("b").text("点击收起更多详情");
    }else{
        //收拢
        con.height("230px");
        $(this).addClass("more");
        $(this).find("i").removeClass("close");
        $(this).find("b").text("点击展开更多详情");
    }
    //设置前一个的高度一样高
    //con.parent().prev().find(".con").height(con.height());
});
//详情页面标签高亮
var label=$(".data_detail .sign").attr("data-label")||"";
var labelarr=label.split(",");
for(var i in labelarr){
    $(".data_detail .sign span:eq("+(labelarr[i]-1)+")").addClass("active");
}


//列表符文文案获取
function fwcl(){
    $(".data_page .pa_choose .box").each(function(i,n){
        var arr=($(n).attr("data-attr")||"").split(",");
        var newArr=[];
        var str=$(n).attr("data-body");
        for(var j in arr){
            if(arr[j]){
                newArr.push(arr[j]);
                str=str.replace(arr[j],"<i>"+arr[j]+"</i>");//给属性加上i标签
            }
        }
        $(n).attr("data-attr",newArr.join(","));
        $(n).find(".ri>span").html(str);
    });

    //符文页面
    $(".data_page .pa_choose .box").click(function(){
        //获取点击符文的类型,等级，id
        var type=$(this).attr("data-type");
        var grade=$(this).attr("data-grade");
        var id=$(this).attr("data-id");
        //判断该符文是否存在
        if($(".data_page .pa_top .left>span[data-id='"+id+"']").length>0){
            alert("已经存在!");
            return ;
        }
        //获取对应类别空位的dom
        var bor=$(".data_page .pa_top .left>span[data-type='"+type+"']:not([data-id])");
        //如果对应类别无空位，或对应类别所有dom
        if(bor.length==0){
            bor=$(".data_page .pa_top .left>span[data-type='"+type+"']");
        }
        //设置对应数据
        bor.eq(0).attr("data-grade",grade);
        bor.eq(0).attr("data-body",$(this).attr("data-body"));
        bor.eq(0).attr("data-attr",$(this).attr("data-attr"));
        bor.eq(0).attr("data-id",id);
        bor.eq(0).find("img").attr("src",$(this).find(".le img").attr("src"));

        jsfw();
    });
}

//点击清除符文
$(".data_page .pa_top .left>span").click(function(){
    $(this).removeAttr("data-grade").removeAttr("data-body")
        .removeAttr("data-id").removeAttr("data-attr").find("img").attr("src","");

    jsfw();
});
//计算符文文案
function jsfw(){
    //获取所有选择的符文
    var choose=$(".data_page .pa_top .left>span[data-grade]");
    var bodyarr=[];
    choose.each(function(i,n){
        var bodyObj={};
        bodyObj.body=$(n).attr("data-body")||"";//文案
        bodyObj.type=$(n).attr("data-type")||"";//类型
        bodyObj.attr=$(n).attr("data-attr")||"";//属性字符串
        bodyObj.arr=bodyObj.attr.split(",");//属性数组
        //去掉属性的文案
        var body_noattr=bodyObj.body;
        for(var j in bodyObj.arr){
            body_noattr=body_noattr.replace(bodyObj.arr[j],"");//去掉属性
        }
        bodyObj.body_noattr=body_noattr;
        for(var j in bodyarr){
            if(bodyarr[j].body_noattr==body_noattr&&bodyarr[j].type==bodyObj.type){//判断去掉属性的文案是否相同
                //相同文案加属性值
                //alert("相同属性");
                for(var n in bodyObj.arr){
                    var add_1=parseFloat(bodyarr[j].arr[n]);//属性字符串转小数
                    var add_2=parseFloat(bodyObj.arr[n]);//属性字符串转小数
                    var add=(add_1+add_2).toFixed(2);
                    //相加后新的属性值转成字符串
                    var newVal=add>=0?"+"+add:""+add;
                    newVal+=bodyarr[j].arr[n].replace(/[\+\-\w\.]*/g,"");

                    bodyarr[j].body=bodyarr[j].body.replace(bodyarr[j].arr[n],newVal);//文案中原属性值替换为新的属性值
                    bodyarr[j].arr[n]=newVal;//属性数组中原属性值替换为新的属性值
                }
                return ;
            }
        }
        //没有相同文案则新增
        bodyarr.push(bodyObj);
    });
    //清除文案
    $(".data_page .pa_top .right>div>p:lt(7)>span").html("");
    for(var i in bodyarr){
        var str=bodyarr[i].body;
        for(var j in bodyarr[i].arr){
            str=str.replace(bodyarr[i].arr[j],"<i>"+bodyarr[i].arr[j]+"</i>");//给属性加上i标签
        }
        $(".data_page .pa_top .right>div>p:eq("+i+")>span").html(str);
    }
}
//清空符文
$(".data_page .pa_top .clear-btn").click(function(){
    //清空所有选择的符文
    $(".data_page .pa_top .left>span").removeAttr("data-grade").removeAttr("data-body")
        .removeAttr("data-id").removeAttr("data-attr").find("img").attr("src","");
    //清除文案
    $(".data_page .pa_top .right>div>p:lt(7)>span").html("");
});
//下拉框选择搜索
$(".data_page .sign_list ul li").click(function() {
    var html = $(this).find("span").html();
    var type_name = $(this).parent().parent().find(".type_name");
    $(".data_page .sign_list ul li").removeClass("active");
    $(this).addClass("active");
    type_name.text(html).css({
        color: "#AE3434"
    });
    type_name.attr("data-value",$(this).attr("data-value"));//设置data-value值

    //type值获取
    var typeVal=$(".data_page .sign_list.color .type_name").attr("data-value")||"";
    var grade=$(".data_page .sign_list.grade .type_name").attr("data-value")||"";
    var rune_url="/article/rune";
    $.get(rune_url,{"type":typeVal,"grade":grade},function(data){
        $(".data_page .pa_choose .box").remove();
        if(data.data.length>0){
            $(".da_no").addClass("hide");
            for(var i in data.data){
                var html="<div class='box ";
                switch (data.data[i].type){
                    case 1:
                        html+="red";break;
                    case 2:
                        html+="blue";break;
                    case 3:
                        html+="green";break;
                    case 4:
                        html+="pur";break;
                }
                html+="' data-type='"+data.data[i].type+"' data-id='"+data.data[i].id+"' ' data-grade='"+data.data[i].grade+"' data-attr='"+data.data[i].attribute+"' data-body='"+data.data[i].body+"'>"+
                "<div class='le'><span><img src='"+data.data[i].thumb+"'/></span><span>Lv."+data.data[i].grade+"</span></div>"+
                "<div class='ri'><h2>"+data.data[i].title+"</h2>"+
                "<span></span></div></div>";
                $(".data_page .pa_choose #mCSB_1_container").append(html);

            }
            fwcl();
        }else{
            $(".da_no").removeClass("hide");
        }
    }, 'json');
});


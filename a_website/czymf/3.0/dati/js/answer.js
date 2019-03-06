$(function(){
    //全局变量
    //默认为10
    var errorList = [0,1,2,3,4,5,6,7,8,9];
    var listIndex = 0;
    var anIndex = errorList[listIndex];
    //获取变量
    var allQuestion = $(".answer");
    var csrf_token = $("meta[name='csrf-token']").attr("content");

    $(".answer ul li a").click(function(){
        var the_all_a = $(this).parent().parent().find("a");
        the_all_a.removeClass("active");
        $(this).addClass("active");
        //标记题目已选
        allQuestion.eq(anIndex).attr("isCheck","true");
        if(listIndex == (errorList.length-1)){
            sendDaAn();
        }else {
            //显示下一题
            showNext();
        }
    });

    //点击上一题
    $(".prev-btn").click(function(){
        showPrev();
    });
    //点击下一题
    $(".next-btn").click(function(){
        var isCheck = allQuestion.eq(anIndex).attr("isCheck");
        if(isCheck != "true"){
            alert("亲,请选择本题答案喔~");
        }else {
            showNext();
        }
    });
    //查看考点
    $(".err-look-kd").click(function(){
        showContentInit(2);
    });
    //点击改错题
    $(".err-change-ct").click(function(){
        var length = errorList.length;
        allQuestion.removeClass("answer_show");
        allQuestion.eq(anIndex).addClass("answer_show");
        $(".prev-btn").removeClass("show");
        if(length == 1){
            $(".next-btn").removeClass("show");
        }else {
            $(".next-btn").addClass("show");
        }
        $(".an-index").html(anIndex + 1);
        showContentInit(0);
    });
    //初始化错题数组
    function initErrorList(list){
        errorList = list;
        listIndex = 0;
        anIndex = errorList[listIndex];
    }
    //初始化显示内容
    function showContentInit(index){
        var an_content = $(".an-content");
        an_content.removeClass("an-content-show");
        an_content.eq(index).addClass("an-content-show");
    }
    //获取所有的答案
    function getAllAnswer(){
        //获取所有的题目答案
        var data = [];
        $(".answer ul li a[class='active']").each(function(){
            var theAn = $(this).children("label").html();
            data.push(theAn);
        });
        return data;
    }
    //发起答案验证
    function sendDaAn(){
        if(daAnAjax){
            daAnAjax.abort();
        }
        var url = $("#page-url").attr("checkUrl");
        var daAnAjax = $.ajax({
            url: url,
            timeout: 3000,
            data:{
                "data": getAllAnswer(),
                "cms_csrf": csrf_token
            },
            type: "post",
            success: function(data){
                var data = JSON.parse(data);
                var status = data.status;
                if(status == 1){
                    initErrorList(data.msg);
                    showErrorNumber(data.msg.length);
                    showContentInit(1);
                }else if(status == 0){
                    var hrefUrl = $("#page-url").attr("hrefUrl");
                    location.href = hrefUrl+"?id="+data.id;
                }else if(status == -1){
                    alert(data.msg);
                }
            },
            complete : function(XMLHttpRequest,status){
                if(status=='timeout'){
                    daAnAjax.abort();
                    alert("链接超时");
                }
            }
        });

        //$.post(url,{
        //    "data": getAllAnswer(),
        //    "cms_csrf": csrf_token
        //},function(data){
        //    var data = JSON.parse(data);
        //    var status = data.status;
        //    console.log(data);
        //    if(status == 1){
        //        initErrorList(data.msg);
        //        showErrorNumber(data.msg.length);
        //        showContentInit(1);
        //    }else if(status == 0){
        //        var hrefUrl = $("#page-url").attr("hrefUrl");
        //        location.href = hrefUrl+"?id="+data.id;
        //    }else if(status == -1){
        //        alert(data.msg);
        //    }
        //});
    }
    //显示错题数
    function showErrorNumber(n){
        $("#err-number").html(n);
    }
    //显示上一页
    function showPrev(){
        listIndex --;
        anIndex = errorList[listIndex];
        $(".an-index").html(anIndex + 1);
        //判断是否显示上一题按钮
        if(listIndex == 0){
            $(".prev-btn").removeClass("show");
        }
        $(".next-btn").addClass("show");
        //显示上一题
        allQuestion.removeClass("answer_show");
        allQuestion.eq(anIndex).addClass("answer_show");
    }
    //显示下一页
    function showNext(){
        listIndex ++;
        anIndex = errorList[listIndex];
        $(".an-index").html(anIndex + 1);
        //判断是否显示下一题按钮
        if(listIndex == errorList.length-1){
            $(".next-btn").removeClass("show");
        }
        $(".prev-btn").addClass("show");
        allQuestion.removeClass("answer_show");
        allQuestion.eq(anIndex).addClass("answer_show");
    }
});
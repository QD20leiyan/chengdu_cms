$(function(){
    //全局变量
    var errList = [0,1,2,3,4,5,6,7,8,9];
    var listIndex = 0;
    var anIndex = errList[listIndex];
    var csrf_token = $("meta[name='csrf-token']").attr("content");
    //获取变量
    var the_answer = $(".a-question");

    //显示上一页
    function showPrev(){
        listIndex--;
        anIndex = errList[listIndex];
        the_answer.removeClass("a-question-show");
        the_answer.eq(anIndex).addClass("a-question-show");
        //显示下一题按钮
        $(".next-btn").addClass("show");
        if(listIndex == 0){
            $(".prev-btn").removeClass("show");
        }
        //显示第几题
        $("#an-index").html(anIndex + 1);
    }
    //显示下一页
    function showNext(){
        listIndex ++;
        anIndex = errList[listIndex];
        the_answer.removeClass("a-question-show");
        the_answer.eq(anIndex).addClass("a-question-show");
        //显示上一题按钮
        $(".prev-btn").addClass("show");
        if(listIndex == (errList.length-1)){
            $(".next-btn").removeClass("show");
        }
        //显示第几题
        $("#an-index").html(anIndex + 1);
    }

    //提交答案
    function sendDaAn(){
        var theAnswer = $(".a-question ul li p[class='active']").children("label");
        var url = $("#page-url").attr("ajax_url");
        var an_data = [];

        theAnswer.each(function(){
           an_data.push($(this).html());
        });
        $.post(url,{
            "data": an_data,
            "cms_csrf": csrf_token
        },function(data){
            var data = JSON.parse(data);
            if(data.status == 1){
                showErrNuber(data.msg.length);
                errListInit(data.msg);
                showAnswerInit(1);
            }else if(data.status == 0){
                //跳转分享页
                var url = $("#page-url").attr("share_url");
                //console.log(url+"?id="+data.id); 
                window.location.href = url+"?id="+data.id;
            }else if(data.status == -1){
                alert(data.msg);
            }
        })
    }

    //初始化错题数
    function errListInit(list){
        errList = list;
        listIndex = 0;
        anIndex = errList[listIndex];
    }

    //显示错题数
    function showErrNuber(n){
        $("#err-number").html(n);
    }

    //初始化页面显示
    function showAnswerInit(index){
        $(".a-container").removeClass("a-container-show");
        $(".a-container").eq(index).addClass("a-container-show");
    }

    //页面事件
    $(".a-question ul li p").click(function(){
        var the_all_a = $(this).parent().parent().find("p");
        the_all_a.removeClass("active");
        $(this).addClass("active");
        //标记题目已选
        the_answer.eq(anIndex).attr("isCheck","true");
        if(listIndex == (errList.length-1)){
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
        var isCheck = the_answer.eq(anIndex).attr("isCheck");
        if(isCheck != "true"){
            alert("亲,请选择本题答案喔~");
        }else {
            showNext();
        }
    });
    //查看考点
    $(".check-btn").click(function(){
        showAnswerInit(2);
    });
    //改错题
    $(".change-btn").click(function(){
        var length = errList.length;
        the_answer.removeClass("a-question-show");
        the_answer.eq(anIndex).addClass("a-question-show");
        $(".prev-btn").removeClass("show");
        if(length == 1){
            $(".next-btn").removeClass("show");
        }else {
            $(".next-btn").addClass("show");
        }
        $("#an-index").html(anIndex + 1);
        showAnswerInit(0);
    });
});
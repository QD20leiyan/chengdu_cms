    var duzhu_val='';
    var sel_val='';
    var name_val='';
    var val_sta1=false;
    var val_sta2=false;
    var val_sta3=false;
    var boxIds = new Array();
    var h5_id="";
    var  h5_wx=$(".h5_wx").html();
    var  h5_data=$(".h5_data").html();
    var sure_url="/h5-common/ajax-save-data.html?h5data="+h5_data;
    var srf = $('meta[name="csrf-token"]').attr('content');
    $(function() {
        // 学号随机数
        var num=Math.ceil(Math.random()*32);
        var stu_num="";
        function pad(num, n) {
          var len = num.toString().length;
          while(len < n) {
            num = "0" + num;
            len++;
          }
          return num;
        }
        stu_num=pad(num,2);
        $("#num").html(stu_num);
        //选择按钮
        $(".page1 .duzhu").click(function(){
            $(".tips").fadeIn(500);
            $(".tips .tip1").fadeIn(500);
        });
        //赌注选择
        $(".tips .tip1 ul li").click(function(){
            var text=$(this).text();
            $(".tips").fadeOut(500);
            $(".tips .tip1").fadeOut(500);
            $(this).addClass("active").siblings().removeClass("active");
            $(".duzhu_input").val(text);
        });
        //弹窗关闭按钮
        $(".tips .close").click(function(){
            $(".tips").fadeOut(500);
            $(".tips .tip1").fadeOut(500);
        });
       //选择按钮
        $(".page1 .sel_term,.page1 .sel_input").click(function(){
            $(".tips").fadeIn(500);
            $(".tips .tip2").fadeIn(500);
        });
        //球队选择
        $(".tips .tip2 ul li").click(function(){
            var text=$(this).text();
            $(".tips").fadeOut(500);
            $(".tips .tip2").fadeOut(500);
            $(this).addClass("active").siblings().removeClass("active");
            $(".sel_input").val(text);
        });
        //点击完成确认截屏
        $("p.over a").click(function(){
            var duzhu_val=$(".duzhu_input").val();
            var sel_val=$(".sel_input").val();
            var name_val=$(".name_val").val();
            if(duzhu_val=="" || duzhu_val == undefined){
                alert("请选择一个赌注哦~");
                val_sta1=false;
                return;
            }else{
                val_sta1=true;
            }
            if(sel_val=="" || sel_val == undefined){
                alert("请选择一个队伍哦~");
                val_sta2=false;
                return;
            }else{
                val_sta2=true;
            }
            if(name_val=="" || name_val == undefined){
                alert("请签下你的大名~");
                val_sta3=false;
                return;
            }else{
                val_sta3=true;
            }
            if(val_sta1&&val_sta2&&val_sta3){
                boxIds.push(sel_val);
                boxIds.push(duzhu_val);
            }
            h5_id=$(".h5_id").text();
            console.log(boxIds);
            $.ajax({
                url: sure_url,
                type: "POST",
                data: {
                  "user_name":name_val,
                  "h5_id":h5_id,
                  "data": [boxIds],
                  "is_repeat":1,
                  "_csrf_frontend":srf
                },
                dataType: "json",
                traditional: true,//这里设置为true
                success: function(data) {
                    if(data.status == 0){
                       $(".js_load").show();
                       $(".wrap").addClass("hidden");
                       $(".page4").removeClass("hidden");
                       $(".page4 .type_info i.type").text(duzhu_val);
                       $(".page4 .txt span").text(sel_val);
                       $(".page4 .qianmin #name").text(name_val);
                       var canvas2 = document.createElement("canvas");
                       let _canvas = document.querySelector('.page4');
                       var w = parseInt(window.getComputedStyle(_canvas).width);
                       var h = parseInt(window.getComputedStyle(_canvas).height);
                       canvas2.width = w * 2;
                       canvas2.height = h * 2;
                       canvas2.style.width = w + "px";
                       canvas2.style.height = h + "px";
                       var context = canvas2.getContext("2d");
                       context.scale(2,2);
                       html2canvas(_canvas,{canvas:canvas2}).then(function(canvas) {
                           console.log(canvas.toDataURL());
                           $(".js_load").hide();
                           $(".jp_img").attr("src",canvas.toDataURL());
                           $(".page4").addClass("hidden");
                           $(".page5").removeClass("hidden");
                       });
                   }else{
                           alert(data.msg);
                        }
                  }
                });
        });

        //测测其他
        $(".repeat a").click(function(){
             location.reload();
        });
    });
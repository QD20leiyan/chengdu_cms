
$(function(){
	

    //animate
    setTimeout(function(){
        $(".time_con").addClass("animate");
    },100)
    //流光
    function light(){
        $(".t_line01 .t_dot").animate({
            top: "72",
            left:"370",
            opacity:"1"
        },1000,function(){
            $(".t_line01 .t_dot").css({top: "0",left:"0",opacity:"0"})
        })
        setTimeout(function(){
            $(".t_line02 .t_dot").animate({
                top: "310",
                left:"-45",
                opacity:"1"
            },800,function(){
                $(".t_line02 .t_dot").css({top: "0",left:"0",opacity:"0"})
            })
        },1500)
        setTimeout(function(){
            $(".t_line03 .t_dot").animate({
                top: "120",
                left:"-160",
                opacity:"1"
            },600,function(){
                $(".t_line03 .t_dot").css({top: "0",left:"0",opacity:"0"})
            })
        },2500)
        setTimeout(function(){
            $(".t_line04 .t_dot").animate({
                top: "0",
                left:"0",
                opacity:"1"
            },400,function(){
                $(".t_line04 .t_dot").css({top: "208px",left:"210px",opacity:"0"})
            })
        },3500)
        setTimeout(function(){
            $(".t_line05 .t_dot").animate({
                top: "-30",
                left:"160",
                opacity:"1"
            },200,function(){
                $(".t_line05 .t_dot").css({top: "0",left:"0",opacity:"0"})
            })
        },4500)
        
    }

    light();

    setInterval(light,10000);
   
});


function public_init(){
    mouse_move();
}

function mouse_move(){
    var startX = 0;
    var startY = 0;
    var endX = 0;
    var endY = 0;
    var page_mofa = $(".page-mofa");
    if(page_mofa.length == 0){
        return;
    }
    $(document).mouseenter(function(e){
        startX = e.pageX;
        startY = e.pageY;
    });
    $(document).mousemove(function(e){
        endX = e.pageX;
        endY = e.pageY;
        var myX = -(endX - startX)/100;
        var myY = -(endY - startY)/100;
        page_mofa.css({
            transform: "translate3d("+myX+"px,"+myY+"px,0)"
        });
    });
}

public_init();
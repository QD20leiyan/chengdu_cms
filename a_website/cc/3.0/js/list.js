/**
 * Created by lmy on 2017/7/26.
 */

var list = {};

list.init = function(ele){
    if(!ele){
        return;
    }
    var list_ul = ele;
    var isClick = true;
    var list_li,
        img_li,
        text_li,
        js_img,
        img_li_len,
        page_w;

    list.startFun = function(){
        list.resetEle();
        list.reset_w_h();
        //默认显示第三张图片的信息
        list.showImg(2);
    };

    //重置节点
    list.resetEle = function(){
        var myLi = list_ul.children().clone();
        list_ul.append(myLi);
        img_li = $(".list-item-img");
        text_li = $(".list-item-text");
        js_img = img_li.children("img");
        img_li_len = img_li.length;
    };

    //重置宽高度
    list.reset_w_h = function(){
        page_w = document.body.clientWidth;
        var f_ele = ele.parent();
        var ul_width = page_w*(0.15+0.02)*(img_li_len+1);
        var li_width = page_w*(0.15);
        var height = page_w*0.37;
        f_ele.css({
            height: height+"px"
        });
        list_ul.css({
            width: ul_width+"px"
        });
        img_li.css({
            width: li_width+"px",
            "margin-right": page_w*0.02+"px"
        });
        $("#showText").css({
            width: li_width+"px"
        });
        list.click_li();
    };

    //显示第几张图片
    list.showImg = function(index){
        var showImg = img_li.eq(index).children("img");
        img_li.eq(index).addClass("active").attr({
            id: "showLi"
        });
        setShowImgSrc(showImg);
        showImg.attr({
            id: "showImg",
            name: index-1
        }).animate({
            right: "4%"
        },400);
        text_li.eq(index).attr({
            id: "showText"
        }).css({
            width: page_w*0.15+"px",
            "margin-right": page_w*0.02+"px"
        });
        showImgClick(showImg);
    };

    //初始化图片显示
    list.resetShowImg = function(){
        var showLi = $("#showLi");
        var showText = $("#showText");
        var showImg = $("#showImg");

        showImg.attr({
            "id":"",
            "name": ""
        }).css("right",0);
        setHideImgSrc(showImg);
        img_li.removeClass("active").attr("id","");
        showText.attr("id","").css({
            "width":0,
            "margin-right": 0
        })
    };
    //点击某张图片进行切换显示
    list.click_li = function(){
        //清空事件
        img_li.unbind();
        img_li.click(function(){
            var id = $(this).attr("id");
            //判断是否为当前显示的图片
            if(id){
                return;
            }
            var moveLeft = page_w*(0.15+0.02);
            var thisIndex = img_li.index($(this));
              
            thisIndex = chengeLiIndex(thisIndex);
            startMove(-(thisIndex-2)*moveLeft,thisIndex);
        });
    };

    //给显示的顶层图片添加方法
    function showImgClick(ele){
        js_img.unbind();
        ele.click(function(event){
            event = event || window.event;
            var m_x = event.clientX;
            var max_l = parseInt(page_w*(0.3+0.02));
            if(m_x > max_l){
                return;
            }
            var moveLeft = page_w*(0.15+0.02);
            var thisIndex = $(this).attr("name");
            thisIndex = chengeLiIndex(thisIndex);
            startMove(-(thisIndex-2)*moveLeft,thisIndex); 
        });   
    }
    //移动方法
    function startMove(left,index){
        list_ul.animate({
            left: left+"px"
        },300,function(){
        	list.resetShowImg();
            list.showImg(index);
        });
    }
    //点击li下标方法
    function chengeLiIndex(index){
        var index = parseInt(index);
        switch (index){
            case 0:{
                index = img_li_len / 2;
            }
                break;
            case 1:{
                index = img_li_len/2+1;
            }
                break;
            case img_li_len-2:{
                index = img_li_len / 2-2;
            }
                break;
            case img_li_len-1:{
                index = img_li_len / 2-1;
            }
                break;
        }
        return index;
    }
    //获取展示图片地址
    function setShowImgSrc(ele){
        var src = ele.attr("src").replace(".png","_show.png");
        ele.attr({
            src: src
        });
        return src;
    }
    //获取隐藏图片地址
    function setHideImgSrc(ele){
        var src = ele.attr("src").replace("_show","");
        ele.attr({
            src: src
        });
        return src;
    }

    list.startFun();
};
window.onresize = function(){
    list.reset_w_h();
};
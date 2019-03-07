$(function(){

  function init(){
     pageBanner.init($(".item_list"));

 }; 

 var pageBanner = {
     index: 1,		
     item: "",  
     container: "",
     init: function(ele){
        this.container = ele;
        this.item = ele.children("li");
        this.preveBtn = $(".i_preve_btn");
        this.nextBtn = $(".i_next_btn");
        this.isShowBtn(this.index);
        this.preveClick();
        this.nextClick();
        this.bannerIconClick();
    },
            //判断是否显示左右按钮
            isShowBtn: function(index){
            	var len = this.item.length;
            	if(index == 1){
            		this.preveBtn.hide(); 
            	} else {
            		this.preveBtn.show();  
            	}

            	if(index == len){
            		this.nextBtn.hide(); 
            	}else{
            		this.nextBtn.show(); 
            	}
            },
            //初始化页面显示
            showInit: function(index){
            	this.item.removeClass("active");
            	this.item.eq(index-1).addClass("active");
            },
            //初始化页面icon标识显示
            showIconInit: function(index){
            	$(".change_item").removeClass("active");
            	$(".change_item").eq(index-1).addClass("active");
            },
            //点击页面标识icon
            bannerIconClick: function(){
            	var theThis = this;
            	$(".change_item").click(function(){
            		theThis.index = $(".change_item").index($(this))+1;
            		theThis.showInit(theThis.index);
            		theThis.showIconInit(theThis.index);
            		theThis.isShowBtn(theThis.index);
            	});
            },
            preveClick: function(){
            	var theThis = this;
            	theThis.preveBtn.click(function(){
            		//改变index
            		theThis.index--;
            		theThis.showInit(theThis.index);
            		theThis.showIconInit(theThis.index);
            		theThis.isShowBtn(theThis.index);
            	});
            },
            nextClick: function(){
            	var theThis = this;            	
            	theThis.nextBtn.click(function(){
            		theThis.index++;
            		theThis.showInit(theThis.index);
            		theThis.showIconInit(theThis.index);
            		theThis.isShowBtn(theThis.index);
            	});
            }
        };

        function the_i2_tc(n){
        	var index = n;
        	var moveL = 890;
        	var i2_tc = $(".i2_tc");
        	var tc_list = $(".tc_list");
        	var tc_item = tc_list.children("li");
        	var tc_len = tc_item.length;

        	(function i2_tc_init(){
        		tc_show_init(index);
        	})();

        	$(".i2_tc_preve").unbind();
        	$(".i2_tc_preve").click(function(){
        		index--;
        		if(index < 0){
        			index = 0;
        		}
        		tc_move();
        	});
        	$(".i2_tc_next").unbind();
        	$(".i2_tc_next").click(function(){
        		index++;
        		if (index == tc_len) {
        			index = tc_len-1;
        		}
        		tc_move();
        	});
        	$(".i2_tc_close").unbind();
        	$(".i2_tc_close").click(function(event){
        		i2_tc.fadeOut("600");
        		i2_tc.attr("show","");
        		event.stopPropagation();
        	});
            //初始化显示内容 
            function tc_show_init(index){
            	tc_list.css({
            		marginLeft: -moveL*index+"px"
            	})
            }
            //切换展示的内容
            function tc_move(){
            	tc_list.animate({
            		marginLeft: -moveL*index+"px"
            	},400);  
            }
        } 

        function the_i3_tc(index){
            var i3_item = $(".i3_tc .tc_content>li"); 
            i3_item.css({
                display: "none"
            }).eq(index).css({
                display: "block"
            })
        } 

        init();

        //页面事件
        $(".item2 div").click(function(){
        	var i2_tc = $(".i2_tc");
        	if(i2_tc.attr("show")){
        		return;
        	}
        	var index = $(".item2 div").index($(this));
        	the_i2_tc(index);
        	i2_tc.fadeIn("400");
        	i2_tc.attr("show",true);
        });

        $(".i3_tz li").click(function(){
        	var i3_tc = $(".i3_tc");
            var index = $(this).index();
            the_i3_tc(index);
            i3_tc.fadeIn("400");
        });
        $(".i3_tc .tc_content li label").click(function(){
            var i3_tc = $(".i3_tc");
            i3_tc.fadeOut("400");
        });

        $(".i4_btn").click(function(){
            $(".i4_tc").fadeIn("400");
        });
        $(".i4_tc .tc_content li label").click(function(){
            $(".i4_tc").fadeOut("400");
        });

    });
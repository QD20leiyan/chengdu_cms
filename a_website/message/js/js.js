$(function(){
	$(".close").click(function(){
		$(".header_wrap").hide();
		$(".secMask").css({"top":0})
	})
	$(".closeTips").click(function(){
		$(".tipsMask").hide();
	})
})
function jump(type){
    var website_id='';
    if(type == 1){ // ca
        website_id=35;
    }else if(type == 2){  // ddd
        website_id=27;
    }else if(type == 3){  //dfzj
        website_id=40;
    }else if(type == 4){  //fc
        website_id=24;
    }else if(type == 5){ //jws
        website_id=37;
    }
    $.ajax({url:'/h5/message/ajax-click.html', data:{'w_id':website_id,'type':1}, type:'get',
        success:function(){},});
    if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
        var loadDateTime = new Date();
        window.setTimeout(function() {
            var timeOutDateTime = new Date();
            if (timeOutDateTime - loadDateTime < 5000) {
                $(".tipsMask").show();
            } else {
                window.close();
            }
        }, 50);
        if(type == 1){ // ca
        	window.location.href = "wx87248846584c5452://";
        }else if(type == 2){  // ddd
        	window.location.href = "wxccf37fee406e5ddc://";
        }else if(type == 3){  //dfzj
        	window.location.href = "tencent1105220627://";
        }else if(type == 4){  //fc
        	window.location.href = "wx2e1fd8da3b7a3ee4://";
        }else if(type == 5){ //jws
        	window.location.href = "wxc198f753e52757da://";
        }
       
    } else if (navigator.userAgent.match(/android/i)) {
        var loadDateTime = new Date();
        window.setTimeout(function() {
            var timeOutDateTime = new Date();
            if (timeOutDateTime - loadDateTime < 5000) {
                $(".tipsMask").show();
            } else {
                window.close();
            }
        }, 50);
        if(type == 1){ // ca
        	window.location = "crisisaction://gotoroom/";
        }else if(type == 2){  // ddd
        	window.location = "com.wyd.hero.dandandao.hero";
        }else if(type == 3){  //dfzj
        	window.location = "tencent1105220627://";
        }else if(type == 4){  //fc
        	window.location = "com.wyd.hero.yqlfc.cb1.apk";
        }else if(type == 5){ //jws
        	window.location = "com.taiyouxi.jiwushuang.hero";
        }
    }
}

function no_jump(type){
    var website_id='';
    var  url='';
    if(type == 1){ // ca
        url='http://downurl.yingxiong.com/url/wap_qmqz.html';
        website_id=35;
    }else if(type == 2){  // ddd
        url='http://downurl.yingxiong.com/url/ddd2_wapgw.html';
        website_id=27;
    }else if(type == 3){  //dfzj
        url='http://downurl.yingxiong.com/url/dfzj_wapgw.html';
        website_id=40;
    }else if(type == 4){  //fc
        url='http://downurl.yingxiong.com/url/fc_wapgw.html';
        website_id=24;
    }else if(type == 5){ //jws
        url='http://downurl.yingxiong.com/url/ifsg_wapgw.html';
        website_id=37;
    }
    $.ajax({
        url:'/h5/message/ajax-click.html',
        data:{'w_id':website_id,'type':2},
        type:'get',
        success:function(){
            window.location=url;
        },
    })
}
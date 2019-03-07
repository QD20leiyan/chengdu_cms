/*
* 公共调用
* @author 张伟杰
* date 20151112
*/

var Pubs = {
	//主栏目下拉菜单
	menuxila:function(){
		//下拉菜单
			$("#menu").find(".i").each(function(){
				
				$(this).bind("mouseover",function(){
					$(this).children(".m2").css("display",'inline');
				});

				$(this).bind("mouseout",function(){
					$(this).children(".m2").css("display",'none');
				});

			});
			
			//b 标记
			var selectmenu = "";//选中的
			$("#menu").find('a').each(function(){
					
					if(this.href == window.location){
						selectmenu = this.href;
						 $(this).addClass('h');
					}
					
			});
			if(!selectmenu || selectmenu=="") $("a[ren='mname']:first").addClass('h');
			//e 标记
			

	},
	globalloading:function(st){ //st 1正在加载,0加载完 
		
		if(saveall_num==0){
			if($('#globalloading')[0]){
				if($('.ingcontent')[0]){
					$('.ingcontent').css("background-image","none");
					$('.ingcontent').html('加载已完成!');
				}
				setTimeout(function(){
					$("#globalloading").animate({top:"-50px",opacity:"hide"},500);
				},200);
				setTimeout(function(){
					$('#globalloading').remove();
				},500);	
					
					
				
			}
		}
		else{
			if(!$('#globalloading')[0]){
				var globalloading = $("<div id='globalloading'/>").css({'height':$('#set_header').height()}),ingcont = $("<p class='ingcontent' />").html('正在奋力为您加载内容..');
					globalloading.append(ingcont);
				$("#set_header").append(globalloading);
			}
		}
		
		
		
	
	},
	saveall_gotoaction_true:function(i){//激活商铺保存按扭
	
		$("#saveall").removeClass("onshopsave_ing");
		$("#saveall").removeClass("onshopsave_ok");
		
		if(i=="ok"){
			saveall_num--;
			setTimeout(function(){
				if(saveall_num==0){
					$("#saveall").attr("gotoaction","ok");
					//$("#saveall").css("color","");
					$("#saveall").addClass("onshopsave_ok");
					Pubs.globalloading(0);
				}
			},2000);
		}else{
			saveall_num++;
			$("#saveall").attr("gotoaction","no");
			//$("#saveall").css("color","#ccc");
			$("#saveall").addClass("onshopsave_ing");
			Pubs.globalloading(1);
		}
	},
	search_product:function(obj,h)//产品搜索
	{
		
		var kw = $(obj).parent().find('.kwyis_input').val();
		var host = '';
		if(h) 
			host = h;
		else if(typeof TPLSET == 'object') 
			host = TPLSET.host;

		if(/^\s*$/.test(kw))
			alert('请输入关键词');
		else
			location.href=host.replace('k-wd','k-'+encodeURIComponent(kw));
	},
	mb_stat:function(shopid,referrer){
	
	$.post("/ajax/ajshop-cmd-mbstat.html", {'shopid':shopid,'referrer':referrer},function (data, textStatus){
	
	//alert(data);
	});
	
	
	},
	show_checkv:function (obj)//加载验证码
	{
		
		if (!obj.parentNode) return ;
		obj.nextSibling.nodeValue = ' ';

		var imgs = obj.parentNode.getElementsByTagName('img');
		//alert(imgs.length);
		var is=0;
		if(imgs.length>0){
			while(imgs.length>=is) {
				imgs[is].parentNode.removeChild(imgs[is]);
				is++;
			}
		}

		var img;
		var id = 'img_checkv';
		img = new Image();
		obj.parentNode.appendChild(img);
		img.src = 'http://i2.ymfile.com/images/shop/shopqs/loading.gif';

		var img2 = new Image();
		obj.parentNode.appendChild(img2);
		img2.title="点击图片更换验证码";
		img2.onload= function(){img.parentNode.removeChild(img)}
		img2.style.cursor="pointer";
		img2.align="absmiddle";
		img2.onclick=function()
		{
			Pubs.onfocus_show_checkv(obj,true);
		};
		img2.src = '/checkCode.html?rand='+ Math.round(Math.random()*1000);
		
	},
	_check_kfs1_form:function()//客服s1留言小功能提示
	{
		if($('#realname').val()=="")
		{
			alert('请输入联系人!');
			$('#realname').focus();
			return false;
		}
		
		if(!/^[A-Z0-9._%-]+@[A-Z0-9._%-]+\.[A-Z]{2,6}$/i.test($("#email").val()))
		{
			alert('请输入有效的Email地址!');
			$("#email").focus();
			return false;
		}
		
		if(!/^0?1[3458]\d{9}$/.test($("#mobile").val()))
		{
			alert("请正确输入手机号码");
			$("#mobile").focus();
			return false;
		}
		if($('#content').val()=="")
		{
			alert('请输入留言内容!');
			$('#content').focus();
			return false;
		}
		if($('#checkv').val()=='')
		{
			alert('请输入验证码!');
			return false;
		}

		return true;

		
	},
	product_detail_viewimglist:function()//产品详细页图片组切换功能
	{
		$("#show_small_ul").children("li").bind("mouseover",function(){
			if($(this).attr("dt"))
			{
				$("#product_img").attr("src",$(this).attr("dt"));
				$("#product_img").parent().attr("href",$(this).attr("dt").replace(/m_/,"").replace(/(\.jpg|\.gif|\.png)/,"-1000$1"));
			}
		});
	},
	ToTopCtrl:function(http_host){//totop控制 @pream http_host 网址
		
		if(http_host){
			http_host = "http://"+http_host.replace("http://","");
		}else{
			http_host = "";
		}
		
		
		var isdisplay = 0;
		
		if($('#totoplist')[0]){
			
			$('#totoplist ul li').off();//清除所有绑定
			
			$('#totoplist ul li').on('mouseover',function(){
				var totop_content = $(this).find('.totop_content');
				if(totop_content[0]){
					$(".totop_content").hide();
					totop_content.css('display','inline');
					isdisplay = 1;
				}
				
			});
			$('#totoplist ul li').on('mouseout',function(){
				
				var totop_content = $(this).find('.totop_content');
				if(totop_content[0]){
				isdisplay = 0;
				setTimeout(function(){if(isdisplay == 0) totop_content.css('display','none')},2000);
				
				}
			});
			$('#totoplist ul li').on('click',function(){
				var at = $(this).attr('class');
				switch(at){
					case "top":
						$("html,body").animate({scrollTop:0},200);
					break;
					case "ms":
						location.href=http_host+'/online.html';
					break;
					case "home":
						location.href=http_host+'/';
					break;
					case "bot":
						$("html,body").animate({scrollTop:$("#footer").offset().top},200);
					break;
					case "zd":
						location.href=http_host+'/contactus.html';
					break;
					default:
				}
			});
			
			 $(window).scroll(function(){
				if($('#totoplist ul').find('.top')){
					if($(window).scrollTop() > 100) {
						$('#totoplist ul').find('.top').css("display","block");
					}else{
						$('#totoplist ul').find('.top').css("display","none");
					}
					
					if($(document).scrollTop() >= $(document).height() - $(window).height()) {
						$('#totoplist ul').find('.bot').css("display","none");
					}else{
						$('#totoplist ul').find('.bot').css("display","block");
					}
				}
			});
		
		}
	},
	jLightBoxShow:function() {/* lightbox功能加载 */
		$("a[rel='jlightbox']").jLightBox();
	},
	productSequence:function()
	{
		
		
		var yuan_url = location.pathname.replace(/\-?sequence\-([a-zA-Z])+/,'').replace(/\.html/,'').replace(/\-?p\-\d+/,'');
		
							
		var sequence_url = {'feng':'','feng_field':'','time':'','time_field':''};
		if(yuan_url == '/product/'){
			
			sequence_url.feng = yuan_url;//."sequence-defeng"按得分排序
			sequence_url.time_field = "sequence-dateline";
			sequence_url.time = yuan_url+sequence_url.time_field+".html";//按时间排序
			
		} 
		else{
			sequence_url.feng = yuan_url+'.html';//."-sequence-defeng"按得分排序
			sequence_url.time_field = "-sequence-dateline";
			sequence_url.time = yuan_url+sequence_url.time_field+".html";//按时间排序
		}
		
		
		//$('.product-sequence [rel-sequence=feng]').on('click',function(){location.href=sequence_url.feng});
		//$('.product-sequence [rel-sequence=time]').on('click',function(){location.href=sequence_url.time});
		$('.product-sequence [rel-sequence]').each(function(){
			
			if(sequence_url[$(this).attr('rel-sequence')]){
								 
				 $(this).attr('rel-href',sequence_url[$(this).attr('rel-sequence')]);
				 if(location.pathname.indexOf(sequence_url[$(this).attr('rel-sequence')+'_field'])>-1) $(this).css({'color':'#ff0000'}).siblings().css({'color':''});
			}
			
			$('.product-sequence [rel-sequence]').bind('click',function(){
				location.href = $(this).attr('rel-href');
			})
			
		});
		
	}
	
	
};



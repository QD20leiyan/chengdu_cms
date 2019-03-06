$(function() {
	$(".rune_con ul li").on("click" , function (){
		//获取点击符文的类型,等级
	    var type=$(this).attr("data-type");
	    var grade=$(this).attr("data-grade");
	    if($(".fw ul li[data-type='"+type+"'][data-grade='"+grade+"']").length>0){
	        alert("已经存在!");
	        return ;
	    }
	    //获取对应类别空位的dom
	    var bor=$(".fw ul li[data-type='"+type+"']:not([data-grade])");
	    //如果对应类别无空位，或对应类别所有dom
	    if(bor.length==0){
	        bor=$(".fw ul li[data-type='"+type+"']");
	    }
	    //设置对应数据
	    bor.eq(0).attr("data-grade",grade);
	    bor.eq(0).attr("data-body",$(this).find(".rune_p .c_body").text());
	    bor.eq(0).attr("data-attr",$(this).attr("data-attr"));
	    bor.eq(0).find("img").attr("src",$(this).find(".rune_img img").attr("src"));	
	    jsfw()
	});    
	//点击清除符文
	$(".fw ul li").click(function() {
		$(this).removeAttr("data-grade").removeAttr("data-body")
			.removeAttr("data-attr").find("img").attr("src", "");

		jsfw()
	});

	//计算符文文案
	function jsfw() {
		//获取所有选择的符文
		var choose = $(".fw ul li[data-grade]");
		var bodyarr = [];
		choose.each(function(i, n) {
			var bodyObj = {};
			bodyObj.body = $(n).attr("data-body") || ""; //文案
			bodyObj.attr = $(n).attr("data-attr") || ""; //属性字符串
			bodyObj.arr = bodyObj.attr.split(","); //属性数组
			//去掉属性的文案
			var body_noattr = bodyObj.body;
			for(var j in bodyObj.arr) {
				body_noattr = body_noattr.replace(bodyObj.arr[j], ""); //去掉属性
			}
			bodyObj.body_noattr = body_noattr;
			for(var j in bodyarr) {
				if(bodyarr[j].body_noattr == body_noattr) { //判断去掉属性的文案是否相同
					//相同文案加属性值
					//alert("相同属性");
					for(var n in bodyObj.arr) {
						var add_1 = parseFloat(bodyarr[j].arr[n]); //属性字符串转小数
						var add_2 = parseFloat(bodyObj.arr[n]); //属性字符串转小数
						var add = add_1 + add_2;
						//相加后新的属性值转成字符串
						var newVal = add >= 0 ? "+" + add : "" + add;
						if(parseInt(add * 100) % 100 == 0) {
							newVal += ".00%";
						} else {
							newVal = newVal.replace(/\..*/, "." + parseInt(add * 100) % 100 + "%");
						}
						bodyarr[j].body = bodyarr[j].body.replace(bodyarr[j].arr[n], newVal); //文案中原属性值替换为新的属性值
						bodyarr[j].arr[n] = newVal; //属性数组中原属性值替换为新的属性值
					}
					return;
				}
			}
			//没有相同文案则新增
			bodyarr.push(bodyObj);
		});
		//清除文案
		$(".nature ul li:lt(7)>p").html("");
		for(var i in bodyarr) {
			var str = bodyarr[i].body;
			for(var j in bodyarr[i].arr) {
				str = str.replace(bodyarr[i].arr[j], "<em>" + bodyarr[i].arr[j] + "</em>"); //给属性加上i标签
			}
			$(".nature>ul>li:eq("+i+")>p").html(str);
			
		}
	}
})

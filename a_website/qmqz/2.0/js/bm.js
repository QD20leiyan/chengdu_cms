$(function(){
	$(".g-submit img").click(function(){
		var name1 = $("input[name='info[a][name]']").val();
		var phone1 = $("input[name='info[a][phone]']").val();
		var school_name1 = $("input[name='info[a][school_name]']").val();
		var qq1 = $("input[name='info[a][qq]']").val();
		var region_sever1 = $("input[name='info[a][region_sever]']").val();
		var game_id1 = $("input[name='info[a][game_id]']").val();
		var teams_name1 = $("input[name='info[a][teams_name]']").val();
		var name2 = $("input[name='info[b][name]']").val();
		var phone2 = $("input[name='info[b][phone]']").val();
		var school_name2 = $("input[name='info[b][school_name]']").val();
		var qq2 = $("input[name='info[b][qq]']").val();
		var region_sever2 = $("input[name='info[b][region_sever]']").val();
		var game_id2 = $("input[name='info[b][game_id]']").val();
		var teams_name2 = $("input[name='info[b][teams_name]']").val();
		var name3 = $("input[name='info[c][name]']").val();
		var phone3 = $("input[name='info[c][phone]']").val();
		var school_name3 = $("input[name='info[c][school_name]']").val();
		var qq3 = $("input[name='info[c][qq]']").val();
		var region_sever3 = $("input[name='info[c][region_sever]']").val();
		var game_id3 = $("input[name='info[c][game_id]']").val();
		var teams_name3 = $("input[name='info[c][teams_name]']").val();
		var name4 = $("input[name='info[d][name]']").val();
		var phone4 = $("input[name='info[d][phone]']").val();
		var school_name4 = $("input[name='info[d][school_name]']").val();
		var qq4 = $("input[name='info[d][qq]']").val();
		var region_sever4 = $("input[name='info[d][region_sever]']").val();
		var game_id4 = $("input[name='info[d][game_id]']").val();
		var teams_name4 = $("input[name='info[d][teams_name]']").val();
		var name5 = $("input[name='info[e][name]']").val();
		var phone5 = $("input[name='info[e][phone]']").val();
		var school_name5 = $("input[name='info[e][school_name]']").val();
		var qq5 = $("input[name='info[e][qq]']").val();
		var region_sever5 = $("input[name='info[e][region_sever]']").val();
		var game_id5 = $("input[name='info[e][game_id]']").val();
		var teams_name5 = $("input[name='info[e][teams_name]']").val();
		var zz= /^[0-9]*$/;
		//做验证
		if(name1 == ''||name2 == ''||name3 == ''||name4 == ''||name5 == ''||phone1==''||phone2==''||phone3==''||phone4==''||phone5==''||school_name1==''||school_name2==''||school_name3==''||school_name4==''||school_name5==''||qq1==''||qq2==''||qq3==''||qq4==''||qq5==''||region_sever1==''||region_sever2==''||region_sever3==''||region_sever4==''||region_sever5==''||game_id1==''||game_id2==''||game_id3==''||game_id4==''||game_id5==''||teams_name1==''||teams_name2==''||teams_name3==''||teams_name4==''||teams_name5==''){
			alert('所有信息均为必填项，请重新输入');
			return false;
		}else if(!zz.test(phone1)||!zz.test(phone2)||!zz.test(phone3)||!zz.test(phone4)||!zz.test(phone5)||!zz.test(qq1)||!zz.test(qq2)||!zz.test(qq3)||!zz.test(qq4)||!zz.test(qq5)){
			//正则(检测联系方式和学生证号是否为数字)
			alert('联系方式必须为数字，请重新输入');
			return false;
		}else if(name1.length>25||name2.length>25||name3.length>25||name4.length>25||name5.length>25){
			//检测姓名的长度
			alert('姓名长度过长，请重新输入');
			return false;
		}else if(phone1.length>20||phone2.length>20||phone3.length>20||phone4.length>20||phone5.length>20){
			//检测联系方式的长度
			alert('联系方式长度过长，请重新输入');
			return false;
		}else if(school_name1.length>25||school_name2.length>25||school_name3.length>25||school_name4.length>25||school_name5.length>25){
			//检测学校名称的长度
			alert('学校名称长度过长，请重新输入');
			return false;
		}else if(qq1.length>50||qq2.length>50||qq3.length>50||qq4.length>50||qq5.length>50){
			//检测学生证号的长度
			alert('学生证号长度过长，请重新输入');
			return false;
		}else if(region_sever1.length>25||region_sever2.length>25||region_sever3.length>25||region_sever4.length>25||region_sever5.length>25){
				//检测所在区服的长度
				alert('学校名称长度过长，请重新输入');
				return false;
			}else if(game_id1.length>100||game_id2.length>100||game_id3.length>100||game_id4.length>100||game_id5.length>100){
				//检测游戏ID的长度
				alert('游戏ID长度过长，请重新输入');
				return false;
			}else if(teams_name1.length>100||teams_name2.length>100||teams_name3.length>100||teams_name4.length>100||teams_name5.length>100){
				//检测战队名称的长度
				alert('战队名称长度过长，请重新输入');
				return false;
			}else{
				subdata();
			}
	});
	function subdata()
	{
        var player1 = new Array();
        player1[0] = $("input[name='info[a][name]']").val();
        player1[1] = $("input[name='info[a][phone]']").val();
        player1[2] = $("input[name='info[a][school_name]']").val();
        player1[3] = $("input[name='info[a][qq]']").val();
        player1[4] = $("input[name='info[a][region_sever]']").val();
        player1[5] = $("input[name='info[a][game_id]']").val();
        player1[6] = $("input[name='info[a][teams_name]']").val();
        player1[7] = $("input[name='info[a][level]']").val();
        var player2 = new Array();
        player2[0] = $("input[name='info[b][name]']").val();
        player2[1] = $("input[name='info[b][phone]']").val();
        player2[2] = $("input[name='info[b][school_name]']").val();
        player2[3] = $("input[name='info[b][qq]']").val();
        player2[4] = $("input[name='info[b][region_sever]']").val();
        player2[5] = $("input[name='info[b][game_id]']").val();
        player2[6] = $("input[name='info[b][teams_name]']").val();
        player2[7] = $("input[name='info[b][level]']").val();
        var player3 = new Array();
        player3[0] = $("input[name='info[c][name]']").val();
        player3[1] = $("input[name='info[c][phone]']").val();
        player3[2] = $("input[name='info[c][school_name]']").val();
        player3[3] = $("input[name='info[c][qq]']").val();
        player3[4] = $("input[name='info[c][region_sever]']").val();
        player3[5] = $("input[name='info[c][game_id]']").val();
        player3[6] = $("input[name='info[c][teams_name]']").val();
        player3[7] = $("input[name='info[c][level]']").val();
        var player4 = new Array();
        player4[0] = $("input[name='info[d][name]']").val();
        player4[1] = $("input[name='info[d][phone]']").val();
        player4[2] = $("input[name='info[d][school_name]']").val();
        player4[3] = $("input[name='info[d][qq]']").val();
        player4[4] = $("input[name='info[d][region_sever]']").val();
        player4[5] = $("input[name='info[d][game_id]']").val();
        player4[6] = $("input[name='info[d][teams_name]']").val();
        player4[7] = $("input[name='info[d][level]']").val();
        var player5 = new Array();
        player5[0] = $("input[name='info[e][name]']").val();
        player5[1] = $("input[name='info[e][phone]']").val();
        player5[2] = $("input[name='info[e][school_name]']").val();
        player5[3] = $("input[name='info[e][qq]']").val();
        player5[4] = $("input[name='info[e][region_sever]']").val();
        player5[5] = $("input[name='info[e][game_id]']").val();
        player5[6] = $("input[name='info[e][teams_name]']").val();
        player5[7] = $("input[name='info[e][level]']").val();
		$.post(
			'/topic/subdata',
			{
				player1:player1,
                player2:player2,
                player3:player3,
                player4:player4,
                player5:player5
			},
			function(msg){
                if(msg == 1){
                    alert('报名成功');
                }else{
                    alert('报名失败');
                }
			}
		);
	}
})

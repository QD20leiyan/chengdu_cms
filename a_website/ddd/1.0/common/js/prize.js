
var _turntable = true;
var _prize=new Array()
_prize[8]="安慰奖";
_prize[7]="一等奖";
_prize[6]="二等奖";
_prize[5]="三等奖";
_prize[4]="安慰奖";
_prize[3]="三等奖";
_prize[2]="二等奖";
_prize[1]="三等奖";

var _key;
var _code;

$(".p-prize-btn").on("click",function(){
  //$("body").on("touchmove",false);
  //活动结束
  //alert('活动已结束');
  //return false;
  //抽奖入库
  //var _num = parseInt($(".page-cj-integral span").text());
  if(_turntable){
    //返回奖品信息
    $.post(
      '/special/get_pinfo',
      {gid:$('#gid').val()},
      function(data){
        var data = eval('(' + data + ')');
		if(data.status == 2){
			lottery();
			_turntable = false;
		  _code = data.code;
		  _key = data.p_id;
        }else if(data.status == -1){
			alert('data.msg');
			return false;
        }else if(data.status == 1){
			var img_url = 'http://dev.static.yingxiong.com/ddd/1.0/common/images/1212/'+data.p_id+'.png';
			$('#p_img').attr('src',img_url);
			if(data.p_id == 1){
				var p_name = 'L6宝石镶嵌礼包*3';
				var p_level = '三等奖';
			}else if(data.p_id == 2){
				var p_name = '神秘羽翼*3天';
				var p_level = '二等奖';
			}else if(data.p_id == 3){
				var p_name = '黑暗死神*3';
				var p_level = '三等奖';
			}else if(data.p_id == 4){
				var p_name = '金币*121212';
				var p_level = '安慰奖';
			}else if(data.p_id == 5){
				var p_name = '玉兔*3';
				var p_level = '三等奖';
			}else if(data.p_id == 6){
				var p_name = '幽灵羽翼*3天';
				var p_level = '二等奖';
			}else if(data.p_id == 7){
				var p_name = '橙色武器制作书*1';
				var p_level = '一等奖';
			}else if(data.p_id == 8){
				var p_name = '甜甜圈*3';
				var p_level = '安慰奖';
			}
			$('#p_level').text(p_level);
			$('#p_name').text(p_name);
			$('#p_code').text(data.code);
			$('.p-tack-prize').show();
		}else{
			$('.p-tack-sign').show();
			return false;
		}
      }
    );
  }
  //else{
    //alert('积分不够')
//  }
});
//转盘转动
function lottery(){
  var _time=8*5;
  var i=0;
  $(".p-prize").css({"-webkit-transform":"rotate(0deg)","-ms-transform":"rotate(0deg)"});
  timeSet = setInterval(function(){
    _time--;
    i++;
    if(_time>=0 || _key==0){
      $(".p-prize").css({"-webkit-transform":"rotate(" + i*45 + "deg)","-ms-transform":"rotate(" + i*45 + "deg)"});
    }else if(_key){
      clearInterval(timeSet);
      zui(50,0,_key);
    }
  },45)
}
function zui(_speed,j,k){
  MtimeSet = setTimeout(function() {
    j++
    if(k>=j){
      j==1?c=0:c=45;var jj = Number(j*45)-Number(-360);
      $(".p-prize").css({"-webkit-transform":"rotate(" + jj + "deg)","-ms-transform":"rotate(" + jj + "deg)"});
      zui(_speed + 10,j,k);
    }else{
		var img_url = 'http://dev.static.yingxiong.com/ddd/1.0/common/images/1212/'+k+'.png';
		  $('#p_img').attr('src',img_url);
		  if(k == 1){
			  var p_name = 'L6宝石镶嵌礼包*3';
			  var p_level = '三等奖';
		  }else if(k == 2){
			  var p_name = '神秘羽翼*3天';
			  var p_level = '二等奖';
		  }else if(k == 3){
			  var p_name = '黑暗死神*3';
			  var p_level = '三等奖';
		  }else if(k == 4){
			  var p_name = '金币*121212';
			  var p_level = '安慰奖';
		  }else if(k == 5){
			  var p_name = '玉兔*3';
			  var p_level = '三等奖';
		  }else if(k == 6){
			  var p_name = '幽灵羽翼*3天';
			  var p_level = '二等奖';
		  }else if(k == 7){
			  var p_name = '橙色武器制作书*1';
			  var p_level = '一等奖';
		  }else if(k == 8){
			  var p_name = '甜甜圈*3';
			  var p_level = '安慰奖';
		  }
		  $('#p_level').text(p_level);
		  $('#p_name').text(p_name);
          $('#p_code').text(_code);
          $('.p-tack-prize').show();
      $("body").off("touchmove",false);
      _turntable = true;
      setTimeout(function(){
        // $(".page-result dl dd").eq(0).before("<dd>"+_prize[k]+"</dd>");
        //var url = window.location.href;
        $(".p-tack-prize").show();
        if(k==3){

          //结果入库
        }else{

          //结果入库
        }

      },800)
    }
  },_speed)
}

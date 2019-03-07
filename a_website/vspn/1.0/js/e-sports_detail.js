var baseurl=$("#main").data("src");
var curMatchID, // 定义当前matchID（及其对应的index，jsonArray中的信息）
    curMatchInfo,
    curMatchIndex,
    docTitle, // document.title
    topDivBgSrc, // topDiv的背景图
    matchIntro, // 赛事介绍
    matchImgs,  // 精彩瞬间的图片
    match_href, // 赛事专题的链接
    logo_src, // logo的src 及宽高
    logo_Width,
    logo_Height,
    match_name, // 赛事名称
    swiper_img_str, // 图集的图片数组
    match_events_array, // 赛事日程
    match_start_year, // 赛事起始年份
    match_end_year, // 赛事结束年份
    match_start_month, // 赛事起始月
    match_last_month; // 赛事结束月

// 获取curMatch的参数
function getUrlVars(){ 
  var vars = [], hash; 
  var hashes = window.location.href.slice(window.location.href.indexOf('?')+1).split('&'); 
  for(var i = 0; i < hashes.length; i++) { 
    hash = hashes[i].split('='); 
    vars.push(hash[0]); 
    vars[hash[0]] = hash[1]; 
  } 
  return vars;
}

// match title 数组
var matchIDArray = new Array();
for(var i = 0; i < intro_json_array.length; i++){
  matchIDArray.push(intro_json_array[i]['gameAbbr']);
}

function getCurMatchIndex(){
  return matchIDArray.indexOf(curMatchID);
}

// 根据curMatchID返回不同数据
function getJSONDataByMatchID(){
  curMatchInfo = intro_json_array[curMatchIndex];
  docTitle = curMatchInfo['title'];
  topDivBgSrc = curMatchInfo['topDivBG'];
  matchIntro = curMatchInfo['introText'];
  matchImgs = curMatchInfo['imgs'];
  match_href = curMatchInfo['more_href'];
  logo_src = curMatchInfo['gameAbbr'];
  logo_Width = parseInt(curMatchInfo['logo_w']);
  logo_Height = parseInt(curMatchInfo['logo_h']);
  match_name = curMatchInfo['title'];
  for(var i = 0; i < curMatchInfo['imgs'].length; i++){
    var tempSrc = curMatchInfo['imgs'][i]['src'];
    swiper_img_str += '<div class="swiper-slide"><a class="example-image-link" href="'+ tempSrc +'" data-lightbox="example-set"><img src="'+ tempSrc +'" alt="' + curMatchID + ' ' + match_name +'"></a></div>';
  }

  match_events_array = curMatchInfo['events_array'];

  if (typeof(match_events_array) != "undefined") {
    // 获取赛事的起始时间，用来初始化日历
    var startTime = match_events_array[0]['start'];
    var endTime = match_events_array[match_events_array.length - 1]['start'];
    match_start_year = parseInt(startTime.split('-')[0]);
    match_end_year = parseInt(endTime.split('-')[0]);
    match_start_month = parseInt(startTime.split('-')[1]);
    match_end_month = parseInt(endTime.split('-')[1]);
  };
}

// 根据json_array的data 赋值
function setData(){
  // 没有events就不显示日历
  if (match_events_array === null || match_events_array === undefined || match_events_array === '') {
    $('.calendarDiv, .calendar').css('display','none');
    $('.conDiv').css('height',957);
  }

  // 没有href就不显示赛事专题
  if (match_href === '') {
    $('#specialSubject').css('display','none');
  }

  document.title = docTitle;
  $('#matchName').html(match_name + '&nbsp;&nbsp;&nbsp;');
  $('#matchLogo').attr('src',baseurl + '/e-sports/'+logo_src+'.png');
  $('#matchLogo').attr('width',logo_Width);
  $('#matchLogo').attr('height',logo_Height);
  $('#matchLogo').attr('alt',curMatchID);
  $('#introText').html(matchIntro);
  $('#specialSubject').click(function(){
    // window.open(match_href);
    window.open(match_href,"_blank","toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=1200, height=1200");
  });

  $('.swiper-wrapper').html(swiper_img_str);
}

var x, y;
var eventsOfDay_W = $('.eventsOfDay').width();
var eventsOfDay_Y = $('.eventsOfDay').height();

$(document).ready(function(){

  curMatchID = getUrlVars()['curMatch'];
  curMatchIndex = getCurMatchIndex();
  getJSONDataByMatchID();
  setData();

  $('.example-image-link').click(function(){
    $('.lb-dataContainer').html('');
  });

  var screenW = screen.width;
  var pre_next_btn_height = $('#preBtn').height();
  var pre_next_btn_margin = ($('.calendarDiv').height() - pre_next_btn_height) / 2;
  $('.btnDiv img').css('margin-top', pre_next_btn_margin);

  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();

  $('.topDiv').css('height', screenW * 330 / 1920);

  $('#month').text(m + '月');

  $('#fullCalendar').fullCalendar({
    header: false,
    height: 497,
    width: 774,
    year: match_start_year,
    month: match_start_month-1,
    events: match_events_array,
  });

  disArrow('preBtn');

  function disArrow(arrow_id){
    $('#'+arrow_id).css('opacity',0.3);
  }

  function ableArrow(arrow_id){
    $('#'+arrow_id).css('opacity',1);
  }

  // 箭头img的上下切换
  $('#preBtn').click(function(){
    // 当前所在的年、月份
    var curM = $('#month').html();
    var curMonth = parseInt(curM.substring(0,curM.length - 1));
    var curYear = $('#fullCalendar').fullCalendar('getDate').getFullYear();
    if (match_end_year == match_start_year) {
      if (curMonth > match_start_month) {
        preBtnFunc();
        if (curMonth - match_start_month == 1) {
          disArrow(this.id);
        }
        ableArrow('nextBtn');
      }else{
        disArrow(this.id);
      }
    }else{
      if (curYear == match_start_year && curMonth > match_start_month) {
        preBtnFunc();
        ableArrow('nextBtn');
        if (curMonth - match_start_month == 1) {
          disArrow(this.id);
        }
      }else if(curYear == match_end_year){
        preBtnFunc();
        ableArrow('nextBtn');
      }else{
        disArrow(this.id);
      }
    }
    

  });

  $('#nextBtn').click(function(){
    // 当前所在的年、月份
    var curM = $('#month').html();
    var curMonth = parseInt(curM.substring(0,curM.length - 1));
    var curYear = $('#fullCalendar').fullCalendar('getDate').getFullYear();
    if (match_end_year == match_start_year) {
      if (curMonth < match_end_month) {
        nextBtnFunc();
        ableArrow('preBtn');
        if (match_end_month - curMonth == 1) {
          disArrow(this.id);
        }
      }else{
        disArrow(this.id);
      }
    }else{
      if (curYear == match_start_year) {
        nextBtnFunc();
        ableArrow('preBtn');
        if (curMonth == 12 && match_end_month == 1) {
          disArrow(this.id);
        }
      }else if(curYear == match_end_year && curMonth < match_end_month){
        nextBtnFunc();
        ableArrow('preBtn');
        if (match_end_month - curMonth == 1) {
          disArrow(this.id);
        }
      }else{
        disArrow(this.id);
      }
    }
    
  });

  function preBtnFunc(){
    $('#fullCalendar').fullCalendar('prev');
    $('.fc-event').css('width', 106);
    $('.fc-event').css('height',24);
    $('.fc-event').css('line-height',24+'px');
    $('.fc-event').css('font-size',0.6+'em');
    changeEventsDivPos();
    $('#month').css('font-size', 24 / 1920 * screenW);
    $('.fc-day-header').css('font-size', 18 / 1920 * screenW);
    $('.fc-grid,.fc-day-number').css('font-size', 24 / 1920 * screenW);
  }

  function nextBtnFunc(){
    $('#fullCalendar').fullCalendar('next');
    $('.fc-event').css('width', 106);
    $('.fc-event').css('height',24);
    $('.fc-event').css('line-height',24+'px');
    $('.fc-event').css('font-size',0.6+'em');
    changeEventsDivPos();
    $('#month').css('font-size', 24 / 1920 * screenW);
    $('.fc-day-header').css('font-size', 18 / 1920 * screenW);
    $('.fc-grid,.fc-day-number').css('font-size', 24 / 1920 * screenW);
  }

  $('.fc-event').css('width', 106);
  $('.fc-event').css('height',24)
  $('.fc-event').css('line-height',24+'px');
  $('.fc-event').css('font-size',0.6+'em');

  
  changeEventsDivPos();
  $('.fc-grid,.fc-day-number').css('font-size', 24 / 1920 * screenW);

});


// 修改events事件样式的位置
function changeEventsDivPos(){
  var enentsDivArr = $('.fc-event');
  
  for(var i = 0; i < enentsDivArr.length; i++){
    var _this = enentsDivArr[i];
    var o_top = $(_this).css('top');
    var o_left = $(_this).css('left');
    var t = parseInt(o_top.substring(0, o_top.length - 2));
    var l = parseInt(o_left.substring(0, o_left.length - 2));
    $(_this).css('top', t + 12);
    $(_this).css('left', l - 1);
  }
}

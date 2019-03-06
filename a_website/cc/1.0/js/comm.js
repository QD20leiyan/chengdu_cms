// JavaScript Document
var IS_DEBUG = false;
if( window.location.href.indexOf( "192.168.1" ) != -1 )
{
	IS_DEBUG = true;
}

var RACE_MAX_IN = new Array();
RACE_MAX_IN[0] = 0;
RACE_MAX_IN[1] = 9; // 神
RACE_MAX_IN[2] = 12; // 人
RACE_MAX_IN[3] = 14; // 妖

var g_curPageIndex = 1;
var g_curRace = 1;
var g_curRaceInI = 0;

var MAX_PAGE = 5;
var g_lastPage1VideoInTime = GetTimeMS();
var g_isPage1VideoPlaying = false;
var g_curPlayPage3VideoIndex = 0;
var g_page1VideoTimeoutH = null;
var g_isPage1FrameVideoPlaying = false;

var g_page3VideoPlayH = null;
var g_page3VideoPlayIsOPed = false;

var g_autoChangeRaceH = null;
var G_AUTO_CHANGE_RACE_TIME = 6500;

var g_autoChangeRaceInH = null;
var G_AUTO_CHANGE_RACE_IN_TIME = 5500;
var G_AUTO_CHANGE_RACE_IN_TIME_0 = 6000;

var g_curPage5ID = 1;
var g_autoChangePage5H = null;
var G_AUTO_CHANGE_PAGE5_TIME = 6500;

var ALL_MOTION_STOP = false;
var MAX_QUESTION_NUM = 10;

var BUTTON_NAME = "提交";
var BUTTON_NAME_ING = "提交中...";
var QUESTION = "问题";
var CHECK_NAME_ING = "查询中...";
var CHECK_NAME = "查询";
var TEL_CODE_NAME = "获取验证码";
var TEL_CODE_NAME_ING = "请求中...";
var TEL_CODE_NAME_AGAIN = "重发一次";

var INVITE_CODE_ERR_1 = "对不起，您的邀请码无效";
var INVITE_CODE_ERR_2 = "对不起，您的邀请码已经使用过";
var INVITE_CODE_ERR_3 = "您帐号已激活，无需重复激活";
var INVITE_CODE_ERR_4 = "系统异常，请稍候再试";

function ElfLoadScript(rURL, rID) {
    var oldscript = document.getElementById(rID);
    var newscript = document.createElement("script");
    newscript.setAttribute("id", rID)
    newscript.setAttribute("src", rURL);
    oldscript.parentNode.replaceChild(newscript, oldscript);
}

function RegCheckIsValidMobile_i(mobileVal) {
    var myreg = /^(((1[0-9][0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if (!myreg.test(mobileVal)) {
        return false;
    }
    return true;
}

function RandPicCode(inputID, imgID) {
    var sessionValue = Math.floor(Math.random() * 1000000);
    var inputObj = document.getElementById(inputID);
    var imgObj = document.getElementById(imgID);
    imgObj.setAttribute("src", "./captcha/graphic?session=" + sessionValue);
    inputObj.value = sessionValue;
}

function DisableOneButton_i(buttonID, inText, timeout) {
    var buttonObj = document.getElementById(buttonID);
    buttonObj.disabled = true;
    buttonObj.style.pointerEvents = "none";
    var oldtext = buttonObj.innerHTML;
    buttonObj.innerHTML = inText;
    if (timeout && timeout > 0) {
        var intv = setInterval(function () {
            --timeout;
            if (timeout <= 0) {
                clearInterval(intv);
                buttonObj.disabled = false;
                buttonObj.style.pointerEvents = "all";
                buttonObj.innerHTML = oldtext;
            }
            else {
                buttonObj.innerHTML = inText + timeout + 's';
            }
        }, 1000);
    }
}

function EnableOneButton_i(buttonID, inText) {
    var buttonObj = document.getElementById(buttonID);
    buttonObj.disabled = false;
    buttonObj.style.pointerEvents = "all";
    buttonObj.innerHTML = inText;
}

function Test() {
    var objDiv = document.getElementById("main_div");
    objDiv.className = "main_t2";
}

function ChangeNav_i() {
    for (i = 1; i <= MAX_PAGE; i++) {
        var navTopObj = document.getElementById("top_nav_" + i);
        if (navTopObj != null) {
            if (i == g_curPageIndex) {
                navTopObj.style.color = "#FFFFFF";
            }
            else {
                navTopObj.style.color = "rgba( 255, 255, 255, 0.5 )";
            }
        }

        var navRightObj = document.getElementById("nav_btn" + i);
        if (i == g_curPageIndex) {
            navRightObj.style.backgroundImage = "url(http://dev.static.yingxiong.com/cc/1.0/images/r_1.png) ";
        }
        else {
            navRightObj.style.backgroundImage = "url(http://dev.static.yingxiong.com/cc/1.0/images/r_0.png) ";
        }
    }
}


function ChangeMainBG_i( curPageID ) {
    var targetPage = document.getElementById("page" + curPageID);
    var main_bg = "http://dev.static.yingxiong.com/cc/1.0/images/bg" + curPageID + ".jpg";
	
    if( curPageID == 2 ) {
        main_bg = "http://dev.static.yingxiong.com/cc/1.0/images/bg4_" + g_curRace + "_0.jpg";
        targetPage.style.backgroundImage = "url(" + main_bg + ")";
    }

    if (curPageID == 5) {
        main_bg = "http://dev.static.yingxiong.com/cc/1.0/images/bg" + curPageID + "_" + g_curPage5ID + ".jpg";
        targetPage.style.backgroundImage = "url(" + main_bg + ")";
    }
}

function PageStop() {
    ALL_MOTION_STOP = true;
    if (g_curPageIndex == 1) {
        Page1VideoStop();
        StopVideo1CG();
        clearTimeout(g_page1VideoTimeoutH);
        var targetPage = document.getElementById("page1");
        targetPage.style.backgroundImage = "url(http://dev.static.yingxiong.com/cc/1.0/images/bg1.jpg )";
    }
    if (g_curPageIndex == 3) {
        Page3VideoStop_i();
    }
}

function PageResume() {
    ALL_MOTION_STOP = false;

    if (g_curPageIndex == 1) {
        g_lastPage1VideoInTime = GetTimeMS();
        g_page1VideoTimeoutH = setTimeout("Page1VideoAutoPlay()", 1000);
    }
    else if (g_curPageIndex == 3) {
        AutoPlayPage3Video_i();
    }
}

function GoToPage(pageIndex) {
    var targetPage = document.getElementById("page" + pageIndex);
    if (targetPage == null) {
        return;
    }

    if (g_curPageIndex == pageIndex) {
        return;
    }

    if (pageIndex == 3) {
        var targetPage = document.getElementById("page3");
        targetPage.style.backgroundImage = "url(http://dev.static.yingxiong.com/cc/1.0/images/bg3.jpg )";
        ResetPage3State_i();
    }
    else {
        clearTimeout(g_page3VideoPlayH);
    }


    if (g_curPageIndex == 3) {
        Page3VideoStop_i();
    }

    if (g_curPageIndex == 1) {
        Page1VideoStop();
        StopVideo1CG();
        clearTimeout(g_page1VideoTimeoutH);
    }


    if( pageIndex == 1 ) {
        g_lastPage1VideoInTime = GetTimeMS();
        g_page1VideoTimeoutH = setTimeout("Page1VideoAutoPlay()", 1000);
        var targetPage = document.getElementById("page1");
        targetPage.style.backgroundImage = "url(http://dev.static.yingxiong.com/cc/1.0/images/bg1.jpg )";
    }


	/*
    if( g_curPageIndex == 2 ) {
        ChangeRace_i(1);
    }
	*/

    if (pageIndex == 2) // race
    {
        ChangeRace_i( 2 );
        g_autoChangeRaceInH = setTimeout("AutoChangeRaceIn_i()", G_AUTO_CHANGE_RACE_IN_TIME_0);
    }
    else {
        //clearTimeout(g_autoChangeRaceH);
		clearTimeout(g_autoChangeRaceInH);		
    }

    if (g_curPageIndex == 5) {
        ChangePage5_i(1);
    }

    if (pageIndex == 5)
    {
        g_autoChangePage5H = setTimeout("AutoChangePage5_i()", G_AUTO_CHANGE_PAGE5_TIME);
    }
    else {
        clearTimeout(g_autoChangePage5H);
    }



    var curPage = document.getElementById("page" + g_curPageIndex);
    targetPage.style.transitionDuration = "0s";
    getComputedStyle(targetPage).transitionDuration; //强制transition-time 马上生效

		
	curPage.style.transitionDuration = "1s";
	getComputedStyle(curPage).transitionDuration; //强制transition-time 马上生效		

    if (g_curPageIndex > pageIndex) {
        targetPage.style.top = "-100%";
        curPage.style.top = "100%";
        curPage.style.opacity = 0;
    }
    else {
        targetPage.style.top = "100%";
        curPage.style.top = "-100%";
        curPage.style.opacity = 0;
    }

    getComputedStyle(targetPage).top; //强制style 马上生效
    targetPage.style.transitionDuration = "1s";
    getComputedStyle(targetPage).transitionDuration; //强制transition-time 马上生效

    targetPage.style.opacity = 1;
    targetPage.style.top = "0%";
	

    g_curPageIndex = pageIndex;


    var bottomBtn = document.getElementById("bottom_btn");
    if (g_curPageIndex == MAX_PAGE) {
        bottomBtn.style.marginTop = "-54px";
        bottomBtn.style.backgroundImage = "url(http://dev.static.yingxiong.com/cc/1.0/images/sc_btn_up.png) ";
    }
    else {
        bottomBtn.style.marginTop = "-19px";
        bottomBtn.style.backgroundImage = "url(http://dev.static.yingxiong.com/cc/1.0/images/sc_btn_down.png) ";
    }

    ChangeNav_i();

    return;
}

function GoNextPage() {
    var targetPage = g_curPageIndex + 1;
    if (g_curPageIndex >= MAX_PAGE) {
        var targetPage = g_curPageIndex - 1;
    }
    GoToPage(targetPage);
}

function AutoChangeRaceIn_i(){
    if (ALL_MOTION_STOP == true) {
        return;
    }
	
	var nextIndex = g_curRaceInI + 1;
	g_curRaceInI ++;
    ChangeRaceIn_i( nextIndex );
	clearTimeout( g_autoChangeRaceInH );
	
	var delayTime = G_AUTO_CHANGE_RACE_IN_TIME;
	var raceMaxIn = RACE_MAX_IN[ g_curRace ];	
	if( nextIndex % raceMaxIn == 0 )
	{
		delayTime = G_AUTO_CHANGE_RACE_IN_TIME_0;
	}	
    g_autoChangeRaceInH = setTimeout("AutoChangeRaceIn_i()", delayTime);
}


function AutoChangeRace_i() {
    if (ALL_MOTION_STOP == true) {
        return;
    }

    var nextRace = g_curRace + 1;
    if (nextRace > 3) {
        nextRace = 1;
    }

    ChangeRace_i(nextRace);
    g_autoChangeRaceH = setTimeout("AutoChangeRace_i()", G_AUTO_CHANGE_RACE_TIME);
}

function ChangeRace(targetRace) {
	
	 var targetPage = document.getElementById("page2");
    targetPage.style.transitionDuration = "1.5s";
    getComputedStyle(targetPage).transitionDuration; //强制transition-time 马上生效		
	
    clearTimeout(g_autoChangeRaceH);
    ChangeRace_i(targetRace);	
		
    clearTimeout(g_autoChangeRaceInH);
	g_curRaceInI = 0;
	g_autoChangeRaceInH = setTimeout("AutoChangeRaceIn_i()", G_AUTO_CHANGE_RACE_IN_TIME_0);
}

function ChangeRaceIn_i( raceInIndex ){
	var raceMaxIn = RACE_MAX_IN[ g_curRace ];	
    var targetPage = document.getElementById("page2");
	var main_bg = "http://dev.static.yingxiong.com/cc/1.0/images/bg4_" + g_curRace + "_"+ raceInIndex % raceMaxIn +".jpg";
	
    targetPage.style.transitionDuration = "3s";
    getComputedStyle(targetPage).transitionDuration; //强制transition-time 马上生效	
	
    targetPage.style.backgroundImage = "url(" + main_bg + ")";
}

function ChangeRace_i(targetRace) {
    var targetRaceCon = document.getElementById("race_" + targetRace + "_desc_con");
    targetRaceCon.scrollTop = "0";
    if (targetRaceCon == null) {
        return;
    }

    if( g_curRace == targetRace && g_curRaceInI == 0 ) {		
        return;
    }

    var curRaceCon = document.getElementById("race_" + g_curRace + "_desc_con");
    curRaceCon.style.opacity = 0;
    curRaceCon.style.pointerEvents = "none";

    targetRaceCon.style.opacity = 1;
    targetRaceCon.style.pointerEvents = "all";

    g_curRace = targetRace;

    for( var i = 1; i <= 3; i++) {
        var raceNavObj = document.getElementById("race_nav_btn" + i);

        if (i == g_curRace) {
            raceNavObj.style.backgroundImage = "url(http://dev.static.yingxiong.com/cc/1.0/images/race_" + i + "_btn_s.png)";
        }
        else {
            raceNavObj.style.backgroundImage = "url(http://dev.static.yingxiong.com/cc/1.0/images/race_" + i + "_btn.png)";
        }
    }
	
    ChangeMainBG_i( 2 );
		
	g_curRaceInI = 0;
	clearTimeout( g_autoChangeRaceInH );
	
    return;
}


function InPageShow_i() {
    PageStop();

    var mainT = document.getElementById("main_t");
    if (mainT.style.webkitFilter != null) {
        mainT.style.webkitFilter = "blur(10px)";
    }

    var ask1 = document.getElementById("ask_1");
    ask1.style.pointerEvents = "all";
    ask1.style.opacity = 1;
    ask1.style.transform = "scale( 1, 1 )";
}

function InPageClose() {
    PageResume();

    var mainT = document.getElementById("main_t");
    if (mainT.style.webkitFilter != null) {
        mainT.style.webkitFilter = "";
    }

    var ask1 = document.getElementById("ask_1");
    ask1.style.pointerEvents = "none";
    ask1.style.opacity = 0;
    ask1.style.transform = "scale( 0, 0 )";
}


function InPageShowAsk() {
	return;
	
    InPageShow_i();

    RandPicCode('ask_pic_code_session', 'ask_pic_code_img');

    document.getElementById("step_check").style.display = "none";
    document.getElementById("check_account_title").style.display = "none";

    document.getElementById("step_account").style.display = "block";
    document.getElementById("ask_account_title").style.display = "block";
    document.getElementById("invite_title").style.display = "none";
}

function InPageShowCheck() {
	alert( "赤潮首次封闭测试已经结束，下一次测试时间暂未确定，敬请留意官网的信息发布。感谢您对于赤潮的厚爱和支持！" );
	/*
    InPageShow_i();

    RandPicCode('check_code_session', 'pic_code_img');

    document.getElementById("step_check").style.display = "block";
    document.getElementById("check_account_title").style.display = "block";

    document.getElementById("step_account").style.display = "none";
    document.getElementById("ask_account_title").style.display = "none";
    document.getElementById("invite_title").style.display = "none";

    var orgCheckRetHint = document.getElementById("check_ret_a");
    if (orgCheckRetHint != null) {
        orgCheckRetHint.style.opacity = 1;
        orgCheckRetHint.style.pointerEvents = "all";
    }

    ShowCheckInit_i();
	*/
}

function GoToInviteCode(isFromRet) {
    EnableOneButton_i("invite_submit", BUTTON_NAME);

    var askCon = document.getElementById("step_ask");
    var inviteCon = document.getElementById("step_invite");

    if (isFromRet == true) {
        askCon = document.getElementById("step_invite_ret");
    }

    askCon.style.animationName = "stepCenterToLeft";
    askCon.style.webkitAnimationName = "stepCenterToLeft";
    askCon.style.pointerEvents = "none";

    document.getElementById("invite_submit").style.pointerEvents = "all";
    inviteCon.style.animationName = "stepRightToCenter";
    inviteCon.style.webkitAnimationName = "stepRightToCenter";
    inviteCon.style.pointerEvents = "all";

    document.getElementById("ask_account_title").style.display = "none";
    document.getElementById("invite_title").style.display = "block";
}

function GoToAsk(isFromRet) {
    var askCon = document.getElementById("step_ask");
    var inviteCon = document.getElementById("step_invite");
    if (isFromRet == true) {
        inviteCon = document.getElementById("step_invite_ret");
    }

    document.getElementById("invite_submit").style.pointerEvents = "none";
    askCon.style.animationName = "stepLeftToCenter";
    askCon.style.webkitAnimationName = "stepLeftToCenter";
    askCon.style.pointerEvents = "all";
    inviteCon.style.animationName = "stepCenterToRight";
    inviteCon.style.webkitAnimationName = "stepCenterToRight";
    inviteCon.style.pointerEvents = "none";

    document.getElementById("ask_account_title").style.display = "block";
    document.getElementById("invite_title").style.display = "none";
}


function GoDownLoad() {
    alert('暂未开放, 敬请期待!')
    //window.location="http://1014472.1251274201.cdn.myqcloud.com/1251274201/1014472/download/RedTides_Setup_09212131.exe";
}

function GetTimeMS() {
    var d = new Date();
    return d.getTime();
}

function ClosePage1VideoBigFrame() {
    return;

    StopVideo1CG();

    var bgm = document.getElementById("bgm");
    bgm.play();
    bgm.currentTime = 0;

    var videoCon = document.getElementById("page1_video_con");
    videoCon.style.animationName = "page1VideoConToSmall";
    videoCon.style.webkitAnimationName = "page1VideoConToSmall";

    var videoImg = document.getElementById("page1_video_img");
    videoImg.style.animationName = "page1VideoExShow";
    videoImg.style.webkitAnimationName = "page1VideoExShow";

    var videoDesc = document.getElementById("page1_video_desc");
    videoDesc.style.animationName = "page1VideoExShow";
    videoDesc.style.webkitAnimationName = "page1VideoExShow";
}


function PlayVideo1CG() {
    return;

    PageStop();

    var bgm = document.getElementById("bgm");
    bgm.pause();

    var videoCon = document.getElementById("page1_video_con");
    videoCon.style.animationName = "page1VideoConToBig";
    videoCon.style.webkitAnimationName = "page1VideoConToBig";

    var videoImg = document.getElementById("page1_video_img");
    videoImg.style.animationName = "page1VideoExDisear";
    videoImg.style.webkitAnimationName = "page1VideoExDisear";

    var videoDesc = document.getElementById("page1_video_desc");
    videoDesc.style.animationName = "page1VideoExDisear";
    videoDesc.style.webkitAnimationName = "page1VideoExDisear";

    var videoPlayer = document.getElementById("page1_main_video");
    videoPlayer.play();
    videoPlayer.currentTime = 0;

    g_isPage1FrameVideoPlaying = true;
}


function StopVideo1CG() {
    return;

    PageResume();

    if (g_isPage1FrameVideoPlaying == true) {
        var videoCon = document.getElementById("page1_video_con");
        videoCon.style.animationName = "page1VideoConToSmall";
        videoCon.style.webkitAnimationName = "page1VideoConToSmall";

        var videoImg = document.getElementById("page1_video_img");
        videoImg.style.animationName = "page1VideoExShow";
        videoImg.style.webkitAnimationName = "page1VideoExShow";

        var videoDesc = document.getElementById("page1_video_desc");
        videoDesc.style.animationName = "page1VideoExShow";
        videoDesc.style.webkitAnimationName = "page1VideoExShow";
    }

    g_isPage1FrameVideoPlaying = false;

    var videoPlayer = document.getElementById("page1_main_video");
    videoPlayer.pause();
}


function Page1VideoStop() {
    var videoPlayer = document.getElementById("page1_bg_video");
    videoPlayer.style.display = "none";
    videoPlayer.pause();
    g_isPage1VideoPlaying = false;
}

function Page1VideoAutoPlay() {
    if (g_curPageIndex != 1) {
        return;
    }

    clearTimeout(g_page1VideoTimeoutH);

    if (GetTimeMS() >= (g_lastPage1VideoInTime + 1900) && g_isPage1VideoPlaying == false) //2s 后开始播放
    {
        g_isPage1VideoPlaying = true;
        var videoPlayer = document.getElementById("page1_bg_video");
        videoPlayer.style.display = "block";
        videoPlayer.play();
    }

    if (GetTimeMS() >= (g_lastPage1VideoInTime + 1000) && g_isPage1VideoPlaying == false) {
        var targetPage = document.getElementById("page1");
        targetPage.style.backgroundImage = "url( http://dev.static.yingxiong.com/cc/1.0/images/bg0.png )";
        g_page1VideoTimeoutH = setTimeout("Page1VideoAutoPlay()", 900);
    }

    return;
}




function ResetPage3State_i() {
    var playingIco = document.getElementById("playing_ico");
    var orgTop = -4;
    playingIco.style.top = orgTop + "px";
    playingIco.style.opacity = 0;
    g_curPlayPage3VideoIndex = 0;

    for (i = 1; i <= 4; i++) {
        var playIco = document.getElementById("play_ico_" + i);
        if (playIco != null) {
            playIco.style.opacity = 1;
        }
    }

    for (i = 0; i <= 4; i++) {
        var page3Desc = document.getElementById("page3_desc_" + i);
        if (page3Desc != null) {
            page3Desc.style.opacity = 0;
        }
    }

    //default play video 1
    /*
	var playIco = document.getElementById("play_ico_1");
	if( playIco != null )
	{
		playIco.style.opacity = 0;
	}
	*/
    var page3Desc = document.getElementById("page3_desc_0");
    if (page3Desc != null) {
        page3Desc.style.opacity = 1;
    }

    g_page3VideoPlayIsOPed = false;
    g_page3VideoPlayH = setTimeout("AutoPlayPage3Video_i()", 2000);
}


function AutoPlayPage3Video_i() {
    if (ALL_MOTION_STOP == true) {
        return;
    }

    PlayPage3Video_i(g_curPlayPage3VideoIndex, true);

    if (g_page3VideoPlayIsOPed == false) {
        g_curPlayPage3VideoIndex = g_curPlayPage3VideoIndex + 1;
        if (g_curPlayPage3VideoIndex >= 5) {
            g_curPlayPage3VideoIndex = 0;
        }
    }
}


function Page3VideoStop_i() {
    /*
	var targetPage = document.getElementById("page3");
	targetPage.style.backgroundImage = "url( http://dev.static.yingxiong.com/cc/1.0/images/bg3.jpg )";
	*/

    var videoPlayer = document.getElementById("page3_video");
    videoPlayer.pause();
    videoPlayer.style.display = "none";
}

function PlayPage3Video(videoIndex) {
    PlayPage3Video_i(videoIndex, false);
    g_page3VideoPlayIsOPed = true;
}

function PlayPage3Video_i(videoIndex, isAllowSame) {
    if (g_curPlayPage3VideoIndex == videoIndex && isAllowSame != true && g_page3VideoPlayIsOPed == true) {
        return;
    }

    clearTimeout(g_page3VideoPlayH);
    g_curPlayPage3VideoIndex = videoIndex;

    var playingIco = document.getElementById("playing_ico");
    if (videoIndex == 0) {
        playingIco.style.opacity = 0;
    }
    else {
        var orgTop = -4;
        var curTop = orgTop + 68 * (videoIndex - 1);
        playingIco.style.top = curTop + "px";
        playingIco.style.opacity = 1;
    }

    //play video	
    var videoPlayer = document.getElementById("page3_video");
    var targetPage = document.getElementById("page3");
    targetPage.style.backgroundImage = "url( http://dev.static.yingxiong.com/cc/1.0/images/bg0.png )";
    videoPlayer.style.display = "block";
    isPage3VideoPlaying = true;

    if (Modernizr.video.webm) {
        videoPlayer.src = "http://dev.static.yingxiong.com/cc/1.0/images/2page3_v_" + g_curPlayPage3VideoIndex + ".webm";
        //alert( videoPlayer.src  );
    }
    else {
        videoPlayer.src = "http://dev.static.yingxiong.com/cc/1.0/images/2page3_v_" + g_curPlayPage3VideoIndex + ".mp4";
        //alert( videoPlayer.src  );
    }

    videoPlayer.play();

    videoPlayer.onended = function () {
        Page3VideoStop_i();
        g_page3VideoPlayH = setTimeout("AutoPlayPage3Video_i()", 1000);
    }

    for (i = 1; i <= 4; i++) {
        var playIco = document.getElementById("play_ico_" + i);
        if (playIco != null) {
            if (i == g_curPlayPage3VideoIndex) {
                playIco.style.opacity = 0;
            }
            else {
                playIco.style.opacity = 1;
            }
        }
    }

    for (i = 0; i <= 4; i++) {
        var page3Desc = document.getElementById("page3_desc_" + i);
        if (page3Desc != null) {
            if (i == g_curPlayPage3VideoIndex) {
                page3Desc.style.opacity = 1;
            }
            else {
                page3Desc.style.opacity = 0;
            }
        }
    }
}



function AutoChangePage5_i() {
    if (ALL_MOTION_STOP == true) {
        return;
    }

    var nextPage5ID = g_curPage5ID + 1;
    if (nextPage5ID > 3) {
        nextPage5ID = 1;
    }

    ChangePage5_i(nextPage5ID);
    g_autoChangePage5H = setTimeout("AutoChangePage5_i()", G_AUTO_CHANGE_PAGE5_TIME);
}

function ChangePage5(targetPage5ID) {
    clearTimeout(g_autoChangePage5H);
    ChangePage5_i(targetPage5ID);
}

function ChangePage5_i(targetPage5ID) {
    var targetPage5Con = document.getElementById("page5_" + targetPage5ID + "_con");
    if (targetPage5Con == null) {
        return;
    }

    if (g_curPage5ID == targetPage5ID) {
        return;
    }

    var curPage5Con = document.getElementById("page5_" + g_curPage5ID + "_con");
    curPage5Con.style.opacity = 0;
    targetPage5Con.style.opacity = 1;

    g_curPage5ID = targetPage5ID;

    for (i = 1; i <= 3; i++) {
        var navObj = document.getElementById("page5_nav_btn" + i);

        if (i == g_curPage5ID) {
            navObj.style.backgroundImage = "url(http://dev.static.yingxiong.com/cc/1.0/images/p5_ico" + i + "_s.png)";
        }
        else {
            navObj.style.backgroundImage = "url(http://dev.static.yingxiong.com/cc/1.0/images/p5_ico" + i + ".png)";
        }
    }
    ChangeMainBG_i( 5 );
    return;
}

function ShowErrMsg(errMsg) {
    EnableOneButton_i("ask_submit", BUTTON_NAME);
    EnableOneButton_i("account_submit", BUTTON_NAME);
    alert(errMsg);
}



var g_lastGoPageTime = GetTimeMS();
var scrollFunc = function (e) {
    var dataDelta = 0;
    e = e || window.event;

    if (e.wheelDelta) {
        dataDelta = e.wheelDelta;
    }
    else if (e.detail) {
        dataDelta = -e.detail; //firefox 滚动方向相反
    }

    if (GetTimeMS() - g_lastGoPageTime < 400) //1000ms 内只滚一次
    {
        return;
    }

    if (ALL_MOTION_STOP == true) {
        return;
    }

    g_lastGoPageTime = GetTimeMS();

    if (dataDelta > 0) {
        GoToPage(g_curPageIndex - 1);
    }
    else {
        GoToPage(g_curPageIndex + 1);
    }
}


/*
function RegRaceConWheel(divID) {
    var raceDiv = document.getElementById(divID);
    raceDiv.onmousewheel = function (e) { g_lastGoPageTime = GetTimeMS(); }
    raceDiv.onscroll = function (e) { clearTimeout(g_autoChangeRaceH); } // noneed auto chage race;
    raceDiv.onmouseover = function (e) { clearTimeout(g_autoChangeRaceH); } // noneed auto chage race;
}
*/


if (document.addEventListener) {
    document.addEventListener('DOMMouseScroll', scrollFunc, false);
}//W3C
window.onmousewheel = document.onmousewheel = scrollFunc;//IE/Opera/Chrome


window.onload = function () {
    g_lastPage1VideoInTime = GetTimeMS();
    g_isPage1VideoPlaying = false;
    g_page1VideoTimeoutH = setTimeout("Page1VideoAutoPlay()", 1000);

    //stop scroll and go page at the same time;
    //RegRaceConWheel("race_1_desc_con");
    //RegRaceConWheel("race_2_desc_con");
    //RegRaceConWheel("race_3_desc_con");

    var bgmObj = document.getElementById("BGM");
    if (bgmObj != null) {
        bgmObj.volume = 0.5;
    }
}


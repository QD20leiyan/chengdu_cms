// JavaScript Document
var IS_DEBUG = false;
if( window.location.href.indexOf( "192.168.1" ) != -1 )
{
	IS_DEBUG = true;
}

var g_curPageIndex = 1;
var g_curRace = 1;

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
            navRightObj.style.backgroundImage = "url(./images/r_1.png) ";
        }
        else {
            navRightObj.style.backgroundImage = "url(./images/r_0.png) ";
        }
    }
}


function ChangeMainBG_i() {
    var targetPage = document.getElementById("page" + g_curPageIndex);
    var main_bg = "./images/bg" + g_curPageIndex + ".jpg";
    if (g_curPageIndex == 4) {
        main_bg = "./images/bg" + g_curPageIndex + "_" + g_curRace + ".jpg";
        targetPage.style.backgroundImage = "url(" + main_bg + ")";
    }

    if (g_curPageIndex == 5) {
        main_bg = "./images/bg" + g_curPageIndex + "_" + g_curPage5ID + ".jpg";
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
        targetPage.style.backgroundImage = "url( ./images/bg1.jpg )";
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
        targetPage.style.backgroundImage = "url( ./images/bg3.jpg )";
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


    if (pageIndex == 1) {
        g_lastPage1VideoInTime = GetTimeMS();
        g_page1VideoTimeoutH = setTimeout("Page1VideoAutoPlay()", 1000);
        var targetPage = document.getElementById("page1");
        targetPage.style.backgroundImage = "url( ./images/bg1.jpg )";
    }


    if (g_curPageIndex == 4) {
        ChangeRace_i(1);
    }

    if (pageIndex == 4) // race
    {
        g_autoChangeRaceH = setTimeout("AutoChangeRace_i()", G_AUTO_CHANGE_RACE_TIME);
    }
    else {
        clearTimeout(g_autoChangeRaceH);
    }

    if (g_curPageIndex == 5) {
        ChangePage5_i(1);
    }

    if (pageIndex == 5) // race
    {
        g_autoChangePage5H = setTimeout("AutoChangePage5_i()", G_AUTO_CHANGE_PAGE5_TIME);
    }
    else {
        clearTimeout(g_autoChangePage5H);
    }



    var curPage = document.getElementById("page" + g_curPageIndex);
    targetPage.style.transitionDuration = "0s";
    getComputedStyle(targetPage).transitionDuration; //强制transition-time 马上生效


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
        bottomBtn.style.backgroundImage = "url(./images/sc_btn_up.png) ";
    }
    else {
        bottomBtn.style.marginTop = "-19px";
        bottomBtn.style.backgroundImage = "url(./images/sc_btn_down.png) ";
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
    clearTimeout(g_autoChangeRaceH);
    ChangeRace_i(targetRace);
}

function ChangeRace_i(targetRace) {
    var targetRaceCon = document.getElementById("race_" + targetRace + "_desc_con");
    targetRaceCon.scrollTop = "0";
    if (targetRaceCon == null) {
        return;
    }

    if (g_curRace == targetRace) {
        return;
    }

    var curRaceCon = document.getElementById("race_" + g_curRace + "_desc_con");
    curRaceCon.style.opacity = 0;
    curRaceCon.style.pointerEvents = "none";

    targetRaceCon.style.opacity = 1;
    targetRaceCon.style.pointerEvents = "all";

    g_curRace = targetRace;

    for (i = 1; i <= 3; i++) {
        var raceNavObj = document.getElementById("race_nav_btn" + i);

        if (i == g_curRace) {
            raceNavObj.style.backgroundImage = "url(./images/race_" + i + "_btn_s.png)";
        }
        else {
            raceNavObj.style.backgroundImage = "url(./images/race_" + i + "_btn.png)";
        }
    }
    ChangeMainBG_i();
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
	return;
    var videoPlayer = document.getElementById("page1_bg_video");
    videoPlayer.style.display = "none";
    videoPlayer.pause();
    g_isPage1VideoPlaying = false;
}

function Page1VideoAutoPlay() {
	return;
	
    if( g_curPageIndex != 1 ){
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
        targetPage.style.backgroundImage = "url( ./images/bg0.png )";
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
    //g_page3VideoPlayH = setTimeout("AutoPlayPage3Video_i()", 2000);
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
	targetPage.style.backgroundImage = "url( ./images/bg3.jpg )";
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
    targetPage.style.backgroundImage = "url( ./images/bg0.png )";
    videoPlayer.style.display = "block";
    isPage3VideoPlaying = true;

    if (Modernizr.video.webm) {
        videoPlayer.src = "video/2page3_v_" + g_curPlayPage3VideoIndex + ".webm";
        //alert( videoPlayer.src  );
    }
    else {
        videoPlayer.src = "video/2page3_v_" + g_curPlayPage3VideoIndex + ".mp4";
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
            navObj.style.backgroundImage = "url(./images/p5_ico" + i + "_s.png)";
        }
        else {
            navObj.style.backgroundImage = "url(./images/p5_ico" + i + ".png)";
        }
    }
    ChangeMainBG_i();
    return;
}

var g_examQuestionIndex = 1;
function ExamGoPre() {
    var preQuestionIndex = g_examQuestionIndex - 1;
    if (preQuestionIndex >= MAX_QUESTION_NUM || preQuestionIndex <= 0) {
        return;
    }

    var curQuestionPage = document.getElementById("exam_con_" + g_examQuestionIndex);
    var preQuestionPage = document.getElementById("exam_con_" + preQuestionIndex);

    g_examQuestionIndex = preQuestionIndex;

	curQuestionPage.style.pointerEvents = "none";
    curQuestionPage.style.animationName = "questionCenterToRight";
    curQuestionPage.style.webkitAnimationName = "questionCenterToRight";
	
    preQuestionPage.style.animationName = "questionLeftToCenter";
    preQuestionPage.style.webkitAnimationName = "questionLeftToCenter";
	preQuestionPage.style.pointerEvents = "all";

    if (g_examQuestionIndex == 1) {
        var preButton = document.getElementById("ask_pre");
        preButton.style.opacity = 0;
        preButton.style.pointerEvents = "none";
    }


    if (g_examQuestionIndex == MAX_QUESTION_NUM - 1) {
        var nextButton = document.getElementById("ask_next");
        var submitButton = document.getElementById("ask_submit");

        nextButton.style.opacity = 1;
        nextButton.style.pointerEvents = "all";

        submitButton.style.opacity = 0;
        submitButton.style.pointerEvents = "none";
    }
}

function ShowPicCodeError(msg) {
    ShowTelCodeHint_i(msg);
    account_form.ask_pic_code.focus();
    RandPicCode('ask_pic_code_session', 'ask_pic_code_img');
    EnableOneButton_i("account_tel_code_btn", TEL_CODE_NAME_AGAIN);
    return;
}

function GoSendAccountTelCode() {
    if (RegCheckIsValidMobile_i(account_form.ask_tel.value) == false) {
        ShowTelCodeHint_i("请填写正确的手机号");
        account_form.ask_tel.focus();
        return;
    }

    if (account_form.ask_pic_code.value.length != 4) {
        ShowTelCodeHint_i("请填写正确的图片验证码");
        account_form.ask_pic_code.focus();
        return;
    }

    DisableOneButton_i("account_tel_code_btn", TEL_CODE_NAME_ING, 60);
    var reqString = "./mrts/phone_captcha_code_fetch?tel=" + account_form.ask_tel.value + "&ask_pic_code=" + account_form.ask_pic_code.value + "&ask_pic_code_session=" + account_form.ask_pic_code_session.value + "&type=1";
    ElfLoadScript(reqString, "r_e_d");
}

/*
function GoSendCheckTelCode()
{
	if( RegCheckIsValidMobile_i( check_form.check_tel.value ) == false )
	{
		ShowTelCodeHint_i( "请填写正确的手机号" );
		check_form.check_tel.focus();
		return;
	}
	
	DisableOneButton_i( "check_tel_code_btn", TEL_CODE_NAME_ING );	
	var reqString = "./telcode_do.php?tel=" + check_form.check_tel.value + "&type=2";
	ElfLoadScript( reqString,"r_e_d" );
}
*/

function ShowTelCodeHint_i(msg) {
    var hintDiv = document.getElementById("telcode_hint");
    hintDiv.style.animationName = "none";
    hintDiv.style.webkitAnimationName = "none";
    getComputedStyle(hintDiv).animationName;
    getComputedStyle(hintDiv).webkitAnimationName;
    hintDiv.style.animationName = "hintShow";
    hintDiv.style.webkitAnimationName = "hintShow";

    if (msg != "") {
        hintDiv.innerHTML = msg;
    }
}

function DoSendCodeFinished(ret, type) {
    if (ret == 0) {
        ShowTelCodeHint_i("手机验证码发送成功，请查收手机短信。");

        if (type == 1) {
            EnableOneButton_i("account_tel_code_btn", TEL_CODE_NAME_AGAIN);
        }
        else {
            EnableOneButton_i("check_tel_code_btn", TEL_CODE_NAME_AGAIN);
        }
    }
    else {
        alert("Send SMS Mobile Code Error:" + ret);
    }
}

function ExamGoNext() {
    var isAnswerChecked = false;
    for (k = 1; k <= 4; k++) {
        var answerID = "answer_" + g_examQuestionIndex + "_" + k;
        var answerRadio = document.getElementById(answerID);
        if (answerRadio.checked) {
            isAnswerChecked = true;
            break;
        }
    }
    if (isAnswerChecked == false) {
        var hintDiv = document.getElementById("question_hint");
        hintDiv.style.animationName = "none";
        hintDiv.style.webkitAnimationName = "none";
        getComputedStyle(hintDiv).animationName;
        getComputedStyle(hintDiv).webkitAnimationName;
        hintDiv.style.animationName = "hintShow";
        hintDiv.style.webkitAnimationName = "hintShow";
        return false;
    }



    var nextQuestionIndex = g_examQuestionIndex + 1;
    if (nextQuestionIndex > MAX_QUESTION_NUM) {
        return;
    }

    var curQuestionPage = document.getElementById("exam_con_" + g_examQuestionIndex);
    var nextQuestionPage = document.getElementById("exam_con_" + nextQuestionIndex);

    g_examQuestionIndex = nextQuestionIndex;

    curQuestionPage.style.pointerEvents = "none";
    curQuestionPage.style.animationName = "questionCenterToLeft";
    curQuestionPage.style.webkitAnimationName = "questionCenterToLeft";
    nextQuestionPage.style.animationName = "questionRightToCenter";
    nextQuestionPage.style.webkitAnimationName = "questionRightToCenter";
    nextQuestionPage.style.pointerEvents = "all";


    if (g_examQuestionIndex == 2) {
        var preButton = document.getElementById("ask_pre");
        preButton.style.opacity = 1;
        preButton.style.pointerEvents = "all";
    }


    if (g_examQuestionIndex == MAX_QUESTION_NUM) {
        var nextButton = document.getElementById("ask_next");
        var submitButton = document.getElementById("ask_submit");

        nextButton.style.opacity = 0;
        nextButton.style.pointerEvents = "none";

        submitButton.style.opacity = 1;
        submitButton.style.pointerEvents = "all";
    }
}


function ExamCreateOneChoice_i(choiceName, questionData, questionIndex, answerIndex) {
    var label = document.createElement("label");

    var input = document.createElement("input");
    input.name = "answer_" + questionIndex;
    input.type = "radio";
    input.value = answerIndex;
    input.id = "answer_" + questionIndex + "_" + answerIndex;
    if (choiceName == "choice_a") {
        //input.setAttribute( "requried", true );
        input.required = true;
    }

    var span = document.createElement("span");
    span.innerHTML = questionData[choiceName];

    label.appendChild(input);
    label.appendChild(span);

    return label;
}

function InitExam() {

    var objAllQuestionDiv = document.getElementById("question_all");
    MAX_QUESTION_NUM = g_examRand.length;

    for (var i = 0; i < g_examRand.length; i++) {
        var question = g_examRand[i];

        var index = i + 1;

        var div = document.createElement("div");
        div.className = "ask_exam_con";
        div.id = "exam_con_" + index;

        var h3 = document.createElement("h3");
        h3.innerHTML = QUESTION + index + ":" + question["desc"];
        div.appendChild(h3);

        var input_hidden = document.createElement("input");
        input_hidden.type = "hidden";
        input_hidden.id = "question_" + index;
        input_hidden.name = "question_" + index;
        input_hidden.value = question["id"];
        div.appendChild(input_hidden);

        div.appendChild(ExamCreateOneChoice_i("choice_a", question, index, 1));
        div.appendChild(ExamCreateOneChoice_i("choice_b", question, index, 2));
        div.appendChild(ExamCreateOneChoice_i("choice_c", question, index, 3));
        div.appendChild(ExamCreateOneChoice_i("choice_d", question, index, 4));

        objAllQuestionDiv.appendChild(div);
    }
}




function ShowPicCodeForCheckError(msg) {
    ShowTelCodeHint_i(msg);
    check_form.check_code.focus();
    RandPicCode('check_code_session', 'pic_code_img');
    EnableOneButton_i("check_submit", BUTTON_NAME);
    return;
}


function CheckSubmit() {
    DisableOneButton_i("check_submit", CHECK_NAME_ING);

    var formCheck = document.getElementById("check_form");
    var reqString = "./mrts/survey_query_result?check_tel=" + formCheck["check_tel"].value + "&check_code=" + formCheck["check_code"].value + "&check_code_session=" + formCheck["check_code_session"].value;
    if (IS_DEBUG == true) {
        reqString = "./phptest/check_do.php?check_tel=13421336246&check_code=112345&check_code_session=11233"
    }
    ElfLoadScript(reqString, "r_e_d"); //异步提交查询
    return false;
}

function ExamSubmit() {
    DisableOneButton_i("ask_submit", BUTTON_NAME_ING);

    var valueArr = new Array();
    var formExam = document.getElementById("exam_form");
    for (var i = 1; i <= MAX_QUESTION_NUM; i++) {
        var questionFieldName = "question_" + i;
        var answerFieldName = "answer_" + i;

        var answerValue = 1;
        for (var j = 1; j <= 4; j++) {
            var radioID = "answer_" + i + "_" + j;
            if (document.getElementById(radioID).checked == true) {
                answerValue = j;
                break;
            }
        }
        //answerValue = formExam[answerFieldName].value;		
        valueArr.push(questionFieldName + "=" + formExam[questionFieldName].value);
        valueArr.push(answerFieldName + "=" + answerValue);
    }
    var reqString = "./mrts/account_commit_answer?" + "&" + valueArr.join("&");
    ElfLoadScript(reqString, "r_e_d"); //异步提交试卷回答
    return false;
}

function ShowErrMsg(errMsg) {
    EnableOneButton_i("ask_submit", BUTTON_NAME);
    EnableOneButton_i("account_submit", BUTTON_NAME);
    alert(errMsg);
}

function ExamRandFinished() {
    InitExam();
    var askCon = document.getElementById("step_ask");
    var examCon = document.getElementById("step_exam");
    askCon.style.pointerEvents = "none";
    askCon.style.animationName = "stepCenterToLeft";
    askCon.style.webkitAnimationName = "stepCenterToLeft";
    examCon.style.animationName = "stepRightToCenter";
    examCon.style.webkitAnimationName = "stepRightToCenter";
    examCon.style.pointerEvents = "all";
}

function AccountSubmit() {
    DisableOneButton_i("account_submit", BUTTON_NAME_ING);

    var closeBtn = document.getElementById("ask_close_btn");
    closeBtn.style.display = "none";

    var valueArr = new Array();
    var formAccount = document.getElementById("account_form");
    valueArr.push("ask_email" + "=" + formAccount["ask_email"].value);
    valueArr.push("ask_tel" + "=" + formAccount["ask_tel"].value);
    valueArr.push("ask_code" + "=" + formAccount["ask_code"].value);

    var reqString = "./mrts/account_login_or_register?" + valueArr.join("&");
    if (IS_DEBUG == true) {
        reqString = "./phptest/account_do.php?ask_email=123@qq.com&ask_tel=13421336246&ask_code=23123"
    }

    ElfLoadScript(reqString, "r_e_d"); //异步提交注册帐号和随机加载试卷
    return false;
}



function InviteSubmit() {
    //	alert("InviteSubmit");

    DisableOneButton_i("invite_submit", BUTTON_NAME_ING);

    var closeBtn = document.getElementById("ask_close_btn");
    closeBtn.style.display = "none";

    var valueArr = new Array();
    var formInvite = document.getElementById("invite_form");
    valueArr.push("invite_email" + "=" + formInvite["invite_email"].value);
    valueArr.push("invite_tel" + "=" + formInvite["invite_tel"].value);
    valueArr.push("invite_code" + "=" + formInvite["invite_code"].value);

    var reqString = "./mrts/account_active_by_cdk?" + valueArr.join("&");
    ElfLoadScript(reqString, "r_e_d"); //异步提交邀请码
    return false;
}

function InviteDoFinished(ret, tel, mail) {
    var closeBtn = document.getElementById("ask_close_btn");
    closeBtn.style.display = "block";

    var inviteCon = document.getElementById("step_invite");
    var retCon = document.getElementById("step_invite_ret");

    document.getElementById("invite_submit").style.pointerEvents = "none";
    inviteCon.style.pointerEvents = "none";
    inviteCon.style.animationName = "stepCenterToLeft";
    inviteCon.style.webkitAnimationName = "stepCenterToLeft";
    retCon.style.animationName = "stepRightToCenter";
    retCon.style.webkitAnimationName = "stepRightToCenter";
    retCon.style.pointerEvents = "all";

    if (ret == 0) {
        document.getElementById("invite_ret_ok").style.display = "block";
        document.getElementById("invite_ret_ok_account").style.display = "block";
        document.getElementById("invite_ret_tel").innerHTML = tel;
        document.getElementById("invite_ret_mail").innerHTML = mail;
        document.getElementById("invite_ret_no").style.display = "none";
    }
    else {
        document.getElementById("invite_ret_ok").style.display = "none";
        document.getElementById("invite_ret_ok_account").style.display = "none";

        var errMsg = INVITE_CODE_ERR_1;
        switch (ret) {
            case 1:
                errMsg = INVITE_CODE_ERR_1;
                break;
            case 2:
                errMsg = INVITE_CODE_ERR_2;
                break;
            case 3:
                errMsg = INVITE_CODE_ERR_3;
                break;
            default:
                errMsg = INVITE_CODE_ERR_4;
                break;
        }


        document.getElementById("invite_ret_msg").innerHTML = errMsg;
        document.getElementById("invite_ret_no").style.display = "block";
    }
}


function ExamDoFinished(tel, mail) {
    var closeBtn = document.getElementById("ask_close_btn");
    closeBtn.style.display = "block";

    var examCon = document.getElementById("step_exam");
    var okCon = document.getElementById("step_ok");
    examCon.style.pointerEvents = "none";
    examCon.style.animationName = "stepCenterToLeft";
    examCon.style.webkitAnimationName = "stepCenterToLeft";
    okCon.style.animationName = "stepRightToCenter";
    okCon.style.webkitAnimationName = "stepRightToCenter";
    okCon.style.pointerEvents = "all";

    document.getElementById("ret_tel").innerHTML = tel;
    document.getElementById("ret_mail").innerHTML = mail;
}

function ShowCheckInit_i() {
    EnableOneButton_i("check_submit", CHECK_NAME);

    for (i = 0; i <= 4; i++) {
        var checkRet = document.getElementById("check_ret_" + i);
        if (checkRet != null) {
            checkRet.style.opacity = 0;
            checkRet.style.pointerEvents = "none";
        }
    }
}


function CheckDoFinished(tel, ret) {
    ShowCheckInit_i();

    var checkRetTel = document.getElementById("check_ret_tel_" + ret);
    if (checkRetTel != null) {
        checkRetTel.innerHTML = tel;
    }

    var orgCheckRetHint = document.getElementById("check_ret_a");
    if (orgCheckRetHint != null) {
        orgCheckRetHint.style.opacity = 0;
        orgCheckRetHint.style.pointerEvents = "none";
    }

    var checkRet = document.getElementById("check_ret_" + ret);
    if (checkRet != null) {
        checkRet.style.opacity = 1;
        if (ret == 1) {
            checkRet.style.pointerEvents = "all";
        }
    }
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

function RegRaceConWheel(divID) {
    var raceDiv = document.getElementById(divID);
    raceDiv.onmousewheel = function (e) { g_lastGoPageTime = GetTimeMS(); }
    raceDiv.onscroll = function (e) { clearTimeout(g_autoChangeRaceH); } // noneed auto chage race;
    raceDiv.onmouseover = function (e) { clearTimeout(g_autoChangeRaceH); } // noneed auto chage race;
}


if (document.addEventListener) {
    document.addEventListener('DOMMouseScroll', scrollFunc, false);
}//W3C
window.onmousewheel = document.onmousewheel = scrollFunc;//IE/Opera/Chrome

var gLastTouchY = 0;

function touchScrollBegin( event )
{	
	if( event.targetTouches.length == 1 ) 
	{ 
		var touch = event.targetTouches[0];	
		gLastTouchY = touch.pageY;
		return;
	}
}

function touchScrollMove( event )
{
	if( event.targetTouches.length == 1 ) 
	{
　　　  event.preventDefault();// 阻止浏览器默认事件，重要 
    }	
	else
	{
		return;
	}
	
	if( gLastTouchY == 0 )
	{
		return;
	}
	
    if( GetTimeMS() - g_lastGoPageTime < 400 ) //1000ms 内只滚一次
    {
        return;
    }
	
	g_lastGoPageTime = GetTimeMS();	
	
	var touch = event.targetTouches[0];	
    if( touch.pageY - gLastTouchY >= 10 )
	{
        GoToPage(g_curPageIndex - 1);
		gLastTouchY = 0;
    }
    else if( touch.pageY - gLastTouchY <= -10 ) {
        GoToPage(g_curPageIndex + 1);
		gLastTouchY = 0;		
    }	
}

function touchScrollEnd( event )
{
	if( event.targetTouches.length == 1 ) 
	{ 
		gLastTouchY = 0;
		return;
	}	
}


window.onload = function () {
    g_lastPage1VideoInTime = GetTimeMS();
    g_isPage1VideoPlaying = false;
    g_page1VideoTimeoutH = setTimeout("Page1VideoAutoPlay()", 1000);

    //stop scroll and go page at the same time;
    RegRaceConWheel("race_1_desc_con");
    RegRaceConWheel("race_2_desc_con");
    RegRaceConWheel("race_3_desc_con");

    var bgmObj = document.getElementById("BGM");
    if (bgmObj != null) {
        bgmObj.volume = 0.5;
    }

	var obj = document.getElementById('main_t');
	obj.addEventListener('touchstart', function(event) { touchScrollBegin( event ); }, false);	
	obj.addEventListener('touchmove', function(event) { touchScrollMove( event ); }, false);			
	obj.addEventListener('touchend', function(event) { touchScrollEnd( event ); }, false);		
}


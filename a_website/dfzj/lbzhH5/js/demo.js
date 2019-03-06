(function() {
	var video;
	var ua = navigator.userAgent.toLowerCase();
	var device = {};
	device.isIOS = ua.match(/iphone os/i) == "iphone os";
	device.isAndroid = ua.match(/android/i) == "android";
	device.isWx = ua.match(/MicroMessenger/i) == "micromessenger";

	//整个应用的控制变量
	var app = {};
	//视频元素的设置
	app.initVideo = function() {

		video = document.querySelector('#mainvideo');
		video.src = mediaURLData['1063'];
		video.addEventListener('timeupdate', function() {

			if(!video.isPlayed && this.currentTime > 0.1) {
				// app.startPlay();
				$('.pagestart').fadeOut(100);
				video.isPlayed = !0;
				// $('.btn_yuyue').show();
				$('.btn_yuyue').fadeIn(1000);
			}
		})
		video.addEventListener('ended', app.videoEndCallback);
	}
	app.videoEndCallback = function() {
		// $('.pageend').css('display','block');
		$('.pageend').fadeIn(500);
		if(device.isAndroid) {
			$('.videobox').hide().css({ zIndex: -1 });
		}
		$('.pagestart').remove();
	}
	//开始按钮回调
	app.startPlay = function() {
		video.style.display = 'block';
		video.play();
	}
	app.checkJSBridge = function() {
		app.bridgeTimer = setInterval(function() {
			if(app.wxBridgeReady) {
				app.startPlay();
				clearInterval(app.bridgeTimer);
			}
		}, 50)
	}
	app.responsive = function() {
		if(window.orientation == 0 || window.orientation == 180) {
			$('.tip').hide();
		} else if(window.orientation == 90 || window.orientation == -90) {
			$('.tip').show();
		}
	}
	$(function() {
		app.initVideo();
		document.addEventListener("WeixinJSBridgeReady", function() {
			video.play();
			video.pause();
			app.wxBridgeReady = !0;
		}, false)
		$('.btn_start').on('click', app.startPlay);
		$('.btn_share').on('click', function() { $('.sharewrap').show(); })
		$('.sharewrap').on('click', function() { $('.sharewrap').hide(); })
		$('.btn_download').on('click', function() {
			try { PTTSendClick('btn', 'download', '落版页下载按钮'); } catch(e) {};
			location.href = 'https://tlbb.qq.com/cp/a20170303xsjhm/index2.html';
		})
		$('.btn_yuyue').on('click', function() {
			try { PTTSendClick('btn', 'download', '视频中下载按钮'); } catch(e) {};
			location.href = 'https://tlbb.qq.com/cp/a20170303xsjhm/index2.html';
		})
		$('.loadingBuff').on('webkitAnimationEnd', function() {
			if(device.isWx && device.isIOS) {
				app.checkJSBridge();
			} else {
				$('.btn_start').fadeIn(200);
			}

		});
		app.responsive();
		window.addEventListener('orientationchange', app.responsive);
	})
})();
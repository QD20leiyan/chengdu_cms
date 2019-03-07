var wrap = document.querySelector(".wrap");
var next = document.querySelector(".arrow_right");
var prev = document.querySelector(".arrow_left");
next.onclick = function() {
	next_pic();
}
prev.onclick = function() {
	prev_pic();
}

function next_pic() {
	var newLeft = parseInt(wrap.style.left) - 600;
	wrap.style.left = newLeft + "px";
}

function prev_pic() {
	var newLeft = parseInt(wrap.style.left) + 600;
	wrap.style.left = newLeft + "px";
}

function next_pic() {
	var newLeft;
	if(wrap.style.left === "-3600px") {
		newLeft = -1200;
	} else {
		newLeft = parseInt(wrap.style.left) - 600;
	}
	wrap.style.left = newLeft + "px";
}

function prev_pic() {
	var newLeft;
	if(wrap.style.left === "0px") {
		newLeft = -2400;
	} else {
		newLeft = parseInt(wrap.style.left) + 600;
	}
	wrap.style.left = newLeft + "px";
}
var timer = null;
function autoPlay () {
  timer = setInterval(function () {
    next_pic();
  },1000);
}
autoPlay();
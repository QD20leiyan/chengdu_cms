function setPageRem() {
    var page_w = document.documentElement.clientWidth;
    var page_h = document.documentElement.clientHeight;
    if (page_w > page_h) {
        //横屏
        if (page_w > 1334) {
            // page_w = 1334;
        }
        document.documentElement.style.fontSize = parseInt(page_w / 13.34 + 1) + 'px';
    } else {
        //竖屏
        if (page_w > 750) {
            // page_w = 750;
        }
        document.documentElement.style.fontSize = parseInt(page_w / 7.5 + 1) + 'px';
    }

}

setPageRem();
window.onresize = function () {
    setPageRem();
};

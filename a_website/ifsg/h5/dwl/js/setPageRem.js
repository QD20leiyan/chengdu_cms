function setPageRem() {
    var page_w = document.documentElement.clientWidth;
    var page_h = document.documentElement.clientHeight;
    if(page_w > page_h) {
        //横屏
        if(page_w > 1334) {
            page_w = 1334;
        }
        document.documentElement.style.fontSize = page_w / 13.34 + 'px';
    } else {
        //竖屏
        if(page_w > 640) {
            page_w = 640;
        }
        document.documentElement.style.fontSize = page_w / 6.4 + 'px';
    }

}
setPageRem();
window.onresize = function() {
    setPageRem();
};

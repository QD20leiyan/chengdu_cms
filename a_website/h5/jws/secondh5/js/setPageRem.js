function setPageRem() {
    var page_w = document.documentElement.clientWidth;
    var page_w = document.documentElement.clientWidth;
    if(page_w > 1024){
        page_w = 1024;
    }
    document.documentElement.style.fontSize = page_w / 6.4 + 'px';
}
setPageRem();
window.onresize = function () {
    setPageRem();
};

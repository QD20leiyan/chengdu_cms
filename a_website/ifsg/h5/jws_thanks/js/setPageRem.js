function setPageRem() {
    var page_w = document.documentElement.clientWidth;
    if (page_w > 640) {
        page_w = 640;
    }
    document.documentElement.style.fontSize = page_w / 6.4 + 'px';
}
setPageRem();
window.onresize = function () {
    setPageRem();
};
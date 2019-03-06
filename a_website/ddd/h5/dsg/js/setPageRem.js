function setPageRem(){
    var page_w = document.documentElement.clientWidth;
    document.documentElement.style.fontSize = page_w / 6.4 + 'px';
}
setPageRem();

window.onresize = function(){
    setPageRem();
}
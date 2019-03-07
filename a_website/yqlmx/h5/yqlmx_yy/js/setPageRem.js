function setPageRem(){
    var page_w = document.documentElement.clientWidth;
    document.documentElement.style.fontSize = page_w / 10.8 + 'px';
}
setPageRem();

window.onresize = function(){
    setPageRem();
}
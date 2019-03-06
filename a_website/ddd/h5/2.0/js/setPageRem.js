function setPageRem(){
    var page_w = document.documentElement.clientWidth;
    if(page_w > 720){
        page_w = 720;
    }
    document.documentElement.style.fontSize = page_w / 7.2 + 'px';
}
setPageRem();

window.onresize = function(){
    setPageRem();
}
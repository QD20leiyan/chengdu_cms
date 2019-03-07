/**
 * Created by Sky丶 on 2017/7/17.
 */
function resetRem(){
    var page_w = document.documentElement.clientWidth;
    if(page_w > 1024){
        page_w = 1024;
    }
    document.documentElement.style.fontSize = page_w / 10.8 + 'px';
}
resetRem();

window.onresize = function(){
    resetRem();
};


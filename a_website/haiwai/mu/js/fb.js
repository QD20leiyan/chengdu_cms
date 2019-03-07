
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-97836502-20');
$(function(){
    //share-fb
    $("#fb-share-button").on('click',function () {
        gtag('event', 'share-fb0316', {'method': 'Google','event_category':'share-fb0316','event_action':'share-fb0316','event_label':'share-fb0316'});
    });
    //googlePlay
    $(".gl_btn").on('click',function () {
        gtag('event', 'mu-googlePlay0316', {'method': 'Google','event_category':'mu-googlePlay0316','event_action':'mu-googlePlay0316','event_label':'mu-googlePlay0316'});
    });
});
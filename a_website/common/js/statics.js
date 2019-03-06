$('[class*="stat_event_"]').click(function(){
    var keys = $(this).attr('class').split(" ");
    for (i in keys){
	console.log(keys[i]);
        HLog.event(keys[i]);
    }
});
(function() {
var timer = setInterval(function () {
        var num = 0;
    if (!window.HLog) {
        num++;
        if (num >= 10) {
            clearInterval(timer);
        }
        console.log(num);
    } else {
        $('[class*="stat_page_"]').each(function(){
            var keys = $(this).attr('class').split(" ");
            for (i in keys){
                HLog.push(keys[i]);
                console.log(keys[i]);
            }
        })
        clearInterval(timer);
    }
}, 500);
})();


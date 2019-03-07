jQuery.fn.timeline = function(options){
  // default plugin settings
  settings = jQuery.extend({
    orientation:              'horizontal', // value: horizontal | vertical, default to horizontal
    containerDiv:             '#timeline',  // value: any HTML tag or #id, default to #timeline
    datesDiv:                 '#dates',     // value: any HTML tag or #id, default to #dates
    datesSpeed:               200,      // value: integer between 100 and 1000 (recommended) or 'slow', 'normal' or 'fast'; default to normal
    prevButton:               '#prev',      // value: any HTML tag or #id, default to #prev
    nextButton:               '#next',      // value: any HTML tag or #id, default to #next
    arrowKeys:                'false',      // value: true | false, default to false
  }, options);

  $(function(){
    var baseurl=$("#main").data("src");
    if ($(settings.datesDiv).length > 0 ) {
      
      var howManyDates = $(settings.datesDiv+' li').length;
      var widthDate = $(settings.datesDiv+' li').width();
      // 获取当前季度
      var myDate = new Date();
      var currYear = myDate.getFullYear().toString();
      var currMonth = myDate.getMonth(); 
      var currQuarter = Math.floor( ( currMonth % 3 == 0 ? ( currMonth / 3 ) : ( currMonth / 3 + 1 ) ) );
      var curr = 'date' + currYear.substring(2) + currQuarter.toString();
      var currEle = document.getElementById(curr);
      // $(currEle).next().attr('src',baseurl+'/about/reddot.png');

      var oriLeftPosition = -(widthDate*howManyDates - (howManyDates-1)*17.5) + 1138 - 40;
      var stepMove = 148.5;
      var showRangeMaxY = 1003;
      var  postionArr = new Array();

      var clickTime = 0;
      // set positions!
      if(settings.orientation == 'horizontal') {
        if(howManyDates<=7 && clickTime==0){
          $(settings.nextButton).css('background-image','url("'+baseurl+'/about/leftarrows.png")');
          $(settings.prevButton).css('background-image','url("'+baseurl+'/about/leftarrows.png")');
          $(settings.nextButton).attr('disabled',true);
          $(settings.prevButton).attr('disabled',true);
        }
        if(howManyDates>7 && clickTime==0){
          $(settings.nextButton).css('background-image','url("'+baseurl+'/about/leftarrows1.png")');
          $(settings.prevButton).css('background-image','url("'+baseurl+'/about/leftarrows.png")');
          $(settings.prevButton).attr('disabled',true);
        }

        $(settings.datesDiv).width(widthDate*howManyDates - (howManyDates-1)*17.5).css('marginLeft',oriLeftPosition);
        var defaultPositionDates = parseInt($(settings.datesDiv).css('marginLeft').substring(0,$(settings.datesDiv).css('marginLeft').indexOf('px')));

        $(settings.datesDiv+' a').each(function(event){
          var id = $(this).attr('id');
          var element = document.getElementById(id);
          var leftValue = $(element).position().left;
          postionArr.push(leftValue);

          if(leftValue < 0 || leftValue > showRangeMaxY){
            $(element).css('display','none');
            $(element).next().css('display','none');
          }else{
            $(element).css('display','flex');
            $(element).next().css('display','block');
          }
        });
      } 


      $(settings.datesDiv+' a').click(function(event){
        event.stopPropagation();
        event.preventDefault();
        var id = $(this).attr('id');
        var thingid = id.substring(4);
        var ele = document.getElementById(id);

        hiddenOther(ele);

        var leftRe = $(ele).position().left;
        var thingele = document.getElementById(thingid);
        if($(ele).hasClass('single')){
          this_related_select_bg = baseurl+'/about/selectbg2.png';
          this_related_bg_img = baseurl+'/about/normalBg2.png';
        }else{
          this_related_select_bg = baseurl+'/about/selectbg.png';
          this_related_bg_img = baseurl+'/about/normalBg.png';
        }
        if ($(thingele).css('visibility') == 'hidden') {
          // 更换背景
          $(ele).css('background','url("'+this_related_select_bg+'") bottom no-repeat');
          $(ele).find('.quarter').css('color','#fff');
          $(ele).find('.year').css('color','#ab9365');
          $(ele).find('.year').css('background-color','#fff');
          $(ele).find('.detail').css('visibility','hidden');
          //显示详情
          $(thingele).css('left',leftRe-53);
          $(thingele).css('visibility','visible');
        }else{
          // 更换背景
          $(ele).css('background','url("'+this_related_bg_img+'") bottom no-repeat');
          $(ele).find('.quarter').css('color','#ab9365');
          $(ele).find('.year').css('color','#fff');
          $(ele).find('.year').css('background-color','#ab9365');
          $(ele).find('.detail').css('visibility','visible');
          //隐藏详情
          $(thingele).css('visibility','hidden');
        }

    
      });


      $(settings.nextButton).bind('click', function(event){
        event.preventDefault();
        
        if(settings.orientation == 'horizontal') {
          clickTime ++;

          if(clickTime<=0){
            $(settings.nextButton).css('background-image','url("'+baseurl+'/about/leftarrows1.png")');
            $(settings.prevButton).css('background-image','url("'+baseurl+'/about/leftarrows.png")');
            $(settings.prevButton).attr('disabled',true);
            $(settings.nextButton).attr('disabled',false);

          }else if(clickTime >= (howManyDates - 7)){
            $(settings.nextButton).css('background-image','url("'+baseurl+'/about/leftarrows.png")');
            $(settings.prevButton).css('background-image','url("'+baseurl+'/about/leftarrows1.png")');
            $(settings.nextButton).attr('disabled',true);
            $(settings.prevButton).attr('disabled',false);

          }else{
            $(settings.nextButton).css('background-image','url("'+baseurl+'/about/leftarrows1.png")');
            $(settings.prevButton).css('background-image','url("'+baseurl+'/about/leftarrows1.png")');
            $(settings.nextButton).attr('disabled',false);
            $(settings.prevButton).attr('disabled',false);
          }

          defaultPositionDates += stepMove;
          $(settings.datesDiv).animate({'marginLeft':defaultPositionDates},{queue:false, duration:'settings.datesSpeed'});

            
          $(settings.datesDiv+' a').each(function(event){
            postionArr[event] += stepMove;
            var id = $(this).attr('id');
            var element = document.getElementById(id);
            var thingid = id.substring(4);
            var thingele = document.getElementById(thingid);
            // var leftValue = $(element).position().left;
            var leftValue = postionArr[event];
            var ee = $(element).offset().left;
            if(leftValue < 0 || leftValue > showRangeMaxY){
              $(element).css('display','none');
              $(element).next().css('display','none');
              
              if($(thingele).css('visibility') == 'visible'){
                $(settings.datesDiv+' li').eq(event).find('a').trigger('click');
              }
              
            }else{
              $(element).css('display','flex');
              $(element).next().css('display','block');
              $(thingele).css('left',leftValue-53);
            }
          });
              
        }                 
      });

      $(settings.prevButton).click(function(event){
        event.preventDefault();
        
        if(settings.orientation == 'horizontal') {
          clickTime --;

          if(clickTime<=0){
            $(settings.nextButton).css('background-image','url("'+baseurl+'/about/leftarrows1.png")');
            $(settings.prevButton).css('background-image','url("'+baseurl+'/about/leftarrows.png")');
            $(settings.prevButton).attr('disabled',true);
            $(settings.nextButton).attr('disabled',false);

          }else if(clickTime >= (howManyDates - 7)){
            $(settings.nextButton).css('background-image','url("'+baseurl+'/about/leftarrows.png")');
            $(settings.prevButton).css('background-image','url("'+baseurl+'/about/leftarrows1.png")');
            $(settings.nextButton).attr('disabled',true);
            $(settings.prevButton).attr('disabled',false);

          }else{
            $(settings.nextButton).css('background-image','url("'+baseurl+'/about/leftarrows1.png")');
            $(settings.prevButton).css('background-image','url("'+baseurl+'/about/leftarrows1.png")');
            $(settings.nextButton).attr('disabled',false);
            $(settings.prevButton).attr('disabled',false);
          }

          defaultPositionDates -= stepMove;
          $(settings.datesDiv).animate({'marginLeft':defaultPositionDates},{queue:false, duration:'settings.datesSpeed'});
        
          $(settings.datesDiv+' a').each(function(event){
            postionArr[event] -= stepMove;
            var id = $(this).attr('id');
            var element = document.getElementById(id);
            var thingid = id.substring(4);
            var thingele = document.getElementById(thingid);
            // var leftValue = $(element).position().left;
            var leftValue = postionArr[event];
            if(leftValue < 0 || leftValue > showRangeMaxY){
              $(element).css('display','none');
              $(element).next().css('display','none');
              
              if($(thingele).css('visibility') == 'visible'){
                $(settings.datesDiv+' li').eq(event).find('a').trigger('click');
              }
            }else{
              $(element).css('display','flex');
              $(element).next().css('display','block');
              $(thingele).css('left',leftValue-53);
            }
          });

        } 
      
      });

      if(settings.arrowKeys=='true') {
        if(settings.orientation=='horizontal') {
          $(document).keydown(function(event){
            if (event.keyCode == 39) {
                 $(settings.nextButton).click();
              }
            if (event.keyCode == 37) {
                 $(settings.prevButton).click();
              }
          });
        } 
      }


      $(document).not($(settings.datesDiv)).click(function(){
          // console.log('111222');
          $(settings.datesDiv+' a').each(function(event){
            var id = $(this).attr('id');
            var ele = document.getElementById(id);
            var thingid = id.substring(4);
            var thingele = document.getElementById(thingid);

            if($(ele).hasClass('single')){
              this_related_select_bg = baseurl+'/about/selectbg2.png';
              this_related_bg_img = baseurl+'/about/normalBg2.png';
            }else{
              this_related_select_bg = baseurl+'/about/selectbg.png';
              this_related_bg_img = baseurl+'/about/normalBg.png';
            }
            if($(thingele).css('visibility') == 'visible'){
              // 更换背景
              $(ele).css('background','url("'+this_related_bg_img+'") bottom no-repeat');
              $(ele).find('.quarter').css('color','#ab9365');
              $(ele).find('.year').css('color','#fff');
              $(ele).find('.year').css('background-color','#ab9365');
              $(ele).find('.detail').css('visibility','visible');
              //隐藏详情
              $(thingele).css('visibility','hidden');
            }
            
          });
      });
      
    }

    function hiddenOther(o){
      $(settings.datesDiv+' a').not($(o)).each(function(event){
        var id = $(this).attr('id');
        var ele = document.getElementById(id);
        var thingid = id.substring(4);
        var thingele = document.getElementById(thingid);
        if($(ele).hasClass('single')){
          this_related_select_bg = baseurl+'/about/selectbg2.png';
          this_related_bg_img = baseurl+'/about/normalBg2.png';
        }else{
          this_related_select_bg = baseurl+'/about/selectbg.png';
          this_related_bg_img = baseurl+'/about/normalBg.png';
        }
        if($(thingele).css('visibility') == 'visible'){
          // 更换背景
          $(ele).css('background','url("'+this_related_bg_img+'") bottom no-repeat');
          $(ele).find('.quarter').css('color','#ab9365');
          $(ele).find('.year').css('color','#fff');
          $(ele).find('.year').css('background-color','#ab9365');
          $(ele).find('.detail').css('visibility','visible');
          //隐藏详情
          $(thingele).css('visibility','hidden');
        }
        
      });
    }
  });
};

